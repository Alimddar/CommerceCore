import { ApiProperty } from '@nestjs/swagger';
export class CreatePurchaseDetailDto {
  @ApiProperty()
  purchase_id: number;

  @ApiProperty()
  product_id: number;

  @ApiProperty()
  quantity: number;
}
