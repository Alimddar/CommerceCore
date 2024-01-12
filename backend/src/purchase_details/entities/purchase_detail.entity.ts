import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Purchase } from '../../purchases/entities/purchase.entity';

@Entity()
export class PurchaseDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  purchase_id: number;

  @Column()
  product_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  priceAtPurchase: number;

  @ManyToOne(() => Purchase, (purchase) => purchase.purchaseDetails)
  @JoinColumn({ name: 'purchase_id' })
  purchase: Purchase;
}
