import { Module } from '@nestjs/common';
import { PurchaseDetailsService } from './purchase_details.service';
import { PurchaseDetailsController } from './purchase_details.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseDetail } from './entities/purchase_detail.entity';
import { Product } from '../products/entities/product.entity';
import { Purchase } from '../purchases/entities/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PurchaseDetail, Product, Purchase])],
  controllers: [PurchaseDetailsController],
  providers: [PurchaseDetailsService],
  exports: [PurchaseDetailsService],
})
export class PurchaseDetailsModule {}
