import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  user_id: number;

  @Column()
  product_id: number;
}
