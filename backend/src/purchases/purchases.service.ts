import { Injectable } from '@nestjs/common';
import { CreatePurchaseDto } from './dto/create-purchase.dto';
import { UpdatePurchaseDto } from './dto/update-purchase.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Purchase } from './entities/purchase.entity';
import { User } from '../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { PurchaseDetail } from 'src/purchase_details/entities/purchase_detail.entity';

@Injectable()
export class PurchasesService {
  constructor(
    @InjectRepository(Purchase)
    private purchaseRepository: Repository<Purchase>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(PurchaseDetail)
    private purchaseDetailsRepository: Repository<PurchaseDetail>,
  ) {}

  async create(createPurchaseDto: CreatePurchaseDto) {
    const user = await this.usersRepository.findOneBy({
      id: createPurchaseDto.user_id,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createPurchaseDto.user_id} does not exist.`,
      );
    }
    const purchase = this.purchaseRepository.create(createPurchaseDto);
    return await this.purchaseRepository.save(purchase);
  }

  async findAll(): Promise<Purchase[]> {
    return this.purchaseRepository.find();
  }

  async findOne(id: number): Promise<Purchase> {
    return this.purchaseRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<void> {
    const purchaseDetails = await this.purchaseDetailsRepository.find({
      where: { purchase_id: id },
    });
    if (purchaseDetails.length > 0) {
      await this.purchaseDetailsRepository.remove(purchaseDetails);
    }
    const purchase = await this.purchaseRepository.findOneBy({ id });
    if (purchase) {
      await this.purchaseRepository.remove(purchase);
    }
  }

  async update(
    id: number,
    updatePurchaseDto: UpdatePurchaseDto,
  ): Promise<Purchase> {
    const purchase = await this.purchaseRepository.findOneBy({ id });
    if (!purchase) {
      throw new NotFoundException(`Purchase with ID ${id} not found.`);
    }
    const updatedPurchase = this.purchaseRepository.merge(
      purchase,
      updatePurchaseDto,
    );
    return await this.purchaseRepository.save(updatedPurchase);
  }

  async totalPrice(): Promise<PurchaseDetail> {
    return this.purchaseDetailsRepository
      .createQueryBuilder('purchase_detail')
      .select('SUM(purchase_detail.priceAtPurchase)', 'total')
      .getRawOne();
  }
}
