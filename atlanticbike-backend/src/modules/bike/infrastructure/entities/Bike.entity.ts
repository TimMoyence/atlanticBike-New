import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BikeCategoryEntity } from './BikeCategory.entity';
import { BikeHistoryEntity } from './BikeHistory.entity';
import { BikePhotoEntity } from './BikePhoto.entity';

@Entity({ name: 'bikes' })
export class BikeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'category_id' })
  categoryId: number;

  @ManyToOne(() => BikeCategoryEntity, (category) => category.bikes, {
    onDelete: 'SET NULL',
  })
  category: BikeCategoryEntity;

  @Column({ name: 'frame_number', unique: true })
  frameNumber: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @Column({ name: 'purchase_date', type: 'date', nullable: true })
  purchaseDate: Date | null;

  @Column({
    name: 'sale_price',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  salePrice: string | null;

  @Column({
    name: 'rental_price_per_day',
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: true,
  })
  rentalPricePerDay: string | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @Column({ name: 'updated_or_created_by', type: 'int', nullable: true })
  updatedOrCreatedBy: number | null;

  @OneToMany(() => BikePhotoEntity, (photo) => photo.bike, {
    cascade: true,
  })
  photos: BikePhotoEntity[];

  @OneToMany(() => BikeHistoryEntity, (history) => history.bike, {
    cascade: true,
  })
  history: BikeHistoryEntity[];
}
