import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from '../../../user/infrastructure/entities/User.entity';
import { BikeEntity } from './Bike.entity';

@Entity({ name: 'bike_history' })
export class BikeHistoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'bike_id' })
  bikeId: number;

  @Column({ type: 'varchar', length: 20 })
  type: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ name: 'performed_by', nullable: true })
  performedBy: number | null;

  @ManyToOne(() => BikeEntity, (bike) => bike.history, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'bike_id' })
  bike: BikeEntity;

  @ManyToOne(() => UserEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'performed_by' })
  user: UserEntity | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_or_created_by', type: 'int', nullable: true })
  updatedOrCreatedBy: number | null;
}
