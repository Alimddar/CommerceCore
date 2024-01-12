import { Injectable } from '@nestjs/common';
import { CreatePurchaseDetailDto } from './dto/create-purchase_detail.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PurchaseDetail } from './entities/purchase_detail.entity';
import { Product } from '../products/entities/product.entity';
import { NotFoundException } from '@nestjs/common';
import { Purchase } from '../purchases/entities/purchase.entity';

@Injectable()
export class PurchaseDetailsService {
  constructor(
    @InjectRepository(PurchaseDetail)
    private purchaseDetailsRepository: Repository<PurchaseDetail>,
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(Purchase)
    private purchasesRepository: Repository<Purchase>,
  ) {}

  async create(createPurchaseDetailDto: CreatePurchaseDetailDto) {
    const product = await this.productsRepository.findOneBy({
      id: createPurchaseDetailDto.product_id,
    });
    if (!product) {
      throw new NotFoundException(
        `Product with ID ${createPurchaseDetailDto.product_id} does not exist.`,
      );
    }
    const purchase = await this.purchasesRepository.findOneBy({
      id: createPurchaseDetailDto.purchase_id,
    });
    if (!purchase) {
      throw new NotFoundException(
        `Purchase with ID ${createPurchaseDetailDto.purchase_id} does not exist.`,
      );
    }
    const priceAtPurchase = createPurchaseDetailDto.quantity * product.price;

    const purchaseDetail = this.purchaseDetailsRepository.create({
      ...createPurchaseDetailDto,
      priceAtPurchase: priceAtPurchase,
    });
    return await this.purchaseDetailsRepository.save(purchaseDetail);
  }

  async findAll(): Promise<PurchaseDetail[]> {
    return this.purchaseDetailsRepository.find();
  }

  async remove(id: number): Promise<PurchaseDetail> {
    const purchaseDetail = await this.purchaseDetailsRepository.findOneBy({
      id,
    });
    return this.purchaseDetailsRepository.remove(purchaseDetail);
  }
}
