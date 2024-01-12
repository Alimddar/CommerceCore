import { PartialType } from '@nestjs/mapped-types';
import { CreatePurchaseDetailDto } from './create-purchase_detail.dto';

export class UpdatePurchaseDetailDto extends PartialType(CreatePurchaseDetailDto) {}
