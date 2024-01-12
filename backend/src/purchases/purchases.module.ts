import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './entities/purchase.entity';
import { User } from '../users/entities/user.entity';
import { PurchaseDetail } from '../purchase_details/entities/purchase_detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Purchase, User, PurchaseDetail])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
  exports: [PurchasesService],
})
export class PurchasesModule {}
