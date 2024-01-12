import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductCategoryDto {
  @ApiProperty()
  name?: string;

  @ApiProperty()
  description?: string;
}
