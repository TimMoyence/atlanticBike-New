import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { BikeEntity } from '../../../bike/infrastructure/entities/Bike.entity';
import { UserEntity } from '../../../user/infrastructure/entities/User.entity';
import { RepairPartEntity } from './RepairPart.entity';

@Entity({ name: 'repairs' })
export class RepairEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'bike_id' })
  bikeId: number;

  @Column({ name: 'mechanic_id', nullable: true })
  mechanicId: number | null;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'repair_date', type: 'date' })
  repairDate: Date;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  cost: string;

  @Column({ type: 'varchar', length: 20 })
  status: string;

  @ManyToOne(() => BikeEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'bike_id' })
  bike: BikeEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'mechanic_id' })
  mechanic: UserEntity | null;

  @OneToMany(() => RepairPartEntity, (repairPart) => repairPart.repair, {
    cascade: true,
  })
  parts: RepairPartEntity[];
}
