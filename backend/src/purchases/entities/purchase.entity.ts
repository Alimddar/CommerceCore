import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { PurchaseDetail } from '../../purchase_details/entities/purchase_detail.entity';

@Entity()
export class Purchase {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ nullable: true })
  updated_at: Date;

  @Column({
    type: 'text',
    default: 'pending',
  })
  status: 'pending' | 'completed' | 'cancelled';

  @OneToMany(() => PurchaseDetail, (purchaseDetail) => purchaseDetail.purchase)
  purchaseDetails: PurchaseDetail[];
}
