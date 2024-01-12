import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { PurchaseDetailsService } from './purchase_details.service';
import { CreatePurchaseDetailDto } from './dto/create-purchase_detail.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('purchase-details')
@Controller('purchase-details')
export class PurchaseDetailsController {
  constructor(
    private readonly purchaseDetailsService: PurchaseDetailsService,
  ) {}

  @Post()
  create(@Body() createPurchaseDetailDto: CreatePurchaseDetailDto) {
    return this.purchaseDetailsService.create(createPurchaseDetailDto);
  }

  @Get()
  findAll() {
    return this.purchaseDetailsService.findAll();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.purchaseDetailsService.remove(+id);
  }
}
