import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RentalPackEntity } from './RentalPack.entity';
import { BikeEntity } from '../../../bike/infrastructure/entities/Bike.entity';
import { AccessoryEntity } from '../../../accessory/infrastructure/entities/Accessory.entity';

@Entity({ name: 'pack_items' })
export class PackItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'pack_id' })
  packId: number;

  @Column({ name: 'bike_id', nullable: true })
  bikeId: number | null;

  @Column({ name: 'accessory_id', nullable: true })
  accessoryId: number | null;

  @Column()
  quantity: number;

  @ManyToOne(() => RentalPackEntity, (pack) => pack.items, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'pack_id' })
  pack: RentalPackEntity;

  @ManyToOne(() => BikeEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'bike_id' })
  bike: BikeEntity | null;

  @ManyToOne(() => AccessoryEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'accessory_id' })
  accessory: AccessoryEntity | null;
}
