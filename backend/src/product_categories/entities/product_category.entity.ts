import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}
