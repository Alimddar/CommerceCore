import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('CreateProduct')
  async create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get('FindAll')
  async findAll() {
    return this.productsService.findAll();
  }

  @Get('FindOne/:id')
  async findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }

  @Patch('Update/:id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete('Remove/:id')
  async remove(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
