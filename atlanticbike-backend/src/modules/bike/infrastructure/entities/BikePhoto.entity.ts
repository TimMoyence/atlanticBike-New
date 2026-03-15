import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BikeEntity } from './Bike.entity';

@Entity({ name: 'bike_photos' })
export class BikePhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'bike_id' })
  bikeId: number;

  @Column({ type: 'text' })
  url: string;

  @Column({ name: 'is_main', default: false })
  isMain: boolean;

  @ManyToOne(() => BikeEntity, (bike) => bike.photos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bike_id' })
  bike: BikeEntity;
}
