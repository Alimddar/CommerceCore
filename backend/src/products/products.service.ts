import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { User } from '../users/entities/user.entity';
import { NotFoundException } from '@nestjs/common';
import { ProductCategory } from 'src/product_categories/entities/product_category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(ProductCategory)
    private productCategoryRepository: Repository<ProductCategory>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const user = await this.usersRepository.findOneBy({
      id: createProductDto.user_id,
    });
    const category = await this.productCategoryRepository.findOneBy({
      id: createProductDto.category_id,
    });
    if (!user) {
      throw new NotFoundException(
        `User with ID ${createProductDto.user_id} does not exist.`,
      );
    }
    if (!category) {
      throw new NotFoundException(
        `Category with ID ${createProductDto.category_id} does not exist.`,
      );
    }
    const newProduct = this.productsRepository.create(createProductDto);
    return this.productsRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  async findOne(id: number): Promise<Product> {
    return this.productsRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    const updatedProduct = Object.assign(product, updateProductDto);
    return this.productsRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<Product> {
    const product = await this.productsRepository.findOneBy({ id });
    return this.productsRepository.remove(product);
  }
}
