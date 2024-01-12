import { IsEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @IsEmpty()
  @ApiProperty()
  content: string;

  @ApiProperty()
  user_id: number;

  @ApiProperty()
  product_id: number;
}
