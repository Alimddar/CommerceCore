import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdatePurchaseDto {
  @ApiPropertyOptional()
  user_id?: number;

  @ApiPropertyOptional({ enum: ['pending', 'completed', 'cancelled'] })
  status?: 'pending' | 'completed' | 'cancelled';
}
