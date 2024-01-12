import { Injectable } from '@nestjs/common';
import { CreateProductCategoryDto } from './dto/create-product_category.dto';
import { UpdateProductCategoryDto } from './dto/update-product_category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductCategory } from './entities/product_category.entity';

@Injectable()
export class ProductCategoriesService {
  constructor(
    @InjectRepository(ProductCategory)
    private productCategoriesRepository: Repository<ProductCategory>,
  ) {}

  async create(
    createProductCategoryDto: CreateProductCategoryDto,
  ): Promise<ProductCategory> {
    const newProductCategory = this.productCategoriesRepository.create(
      createProductCategoryDto,
    );
    return this.productCategoriesRepository.save(newProductCategory);
  }

  async findAll(): Promise<ProductCategory[]> {
    return this.productCategoriesRepository.find();
  }

  async findOne(id: number): Promise<ProductCategory> {
    return this.productCategoriesRepository.findOneBy({ id });
  }

  async update(
    id: number,
    updateProductCategoryDto: UpdateProductCategoryDto,
  ): Promise<ProductCategory> {
    const productCategory = await this.productCategoriesRepository.findOneBy({
      id,
    });
    const updatedProductCategory = Object.assign(
      productCategory,
      updateProductCategoryDto,
    );
    return this.productCategoriesRepository.save(updatedProductCategory);
  }

  async remove(id: number): Promise<ProductCategory> {
    const productCategory = await this.productCategoriesRepository.findOneBy({
      id,
    });
    return this.productCategoriesRepository.remove(productCategory);
  }

  async removeAll(): Promise<void> {
    const productCategories = await this.productCategoriesRepository.find();
    if (productCategories.length > 0) {
      await this.productCategoriesRepository.remove(productCategories);
    }
  }
}
