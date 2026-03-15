import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { RepairEntity } from './Repair.entity';
import { PartEntity } from './Part.entity';

@Entity({ name: 'repair_parts' })
export class RepairPartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'repair_id' })
  repairId: number;

  @Column({ name: 'part_id' })
  partId: number;

  @Column()
  quantity: number;

  @ManyToOne(() => RepairEntity, (repair) => repair.parts, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'repair_id' })
  repair: RepairEntity;

  @ManyToOne(() => PartEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'part_id' })
  part: PartEntity;
}
