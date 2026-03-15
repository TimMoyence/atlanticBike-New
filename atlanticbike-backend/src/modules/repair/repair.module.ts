import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddPartToRepairUseCase } from './application/AddPartToRepairUseCase';
import { CreateRepairUseCase } from './application/CreateRepairUseCase';
import { DeleteRepairUseCase } from './application/DeleteRepairUseCase';
import { GetRepairByIdUseCase } from './application/GetRepairByIdUseCase';
import { ListPartsUseCase } from './application/ListPartsUseCase';
import { ListRepairsUseCase } from './application/ListRepairsUseCase';
import { RemovePartFromRepairUseCase } from './application/RemovePartFromRepairUseCase';
import { UpdateRepairUseCase } from './application/UpdateRepairUseCase';
import { REPAIR_REPOSITORY } from './domain/tokens';
import { RepairController } from './interfaces/RepairController';
import { RepairRepositoryTypeORM } from './infrastructure/RepairRepositoryTypeORM';
import { PartEntity } from './infrastructure/entities/Part.entity';
import { RepairEntity } from './infrastructure/entities/Repair.entity';
import { RepairPartEntity } from './infrastructure/entities/RepairPart.entity';

const REPAIR_USE_CASES = [
  ListRepairsUseCase,
  GetRepairByIdUseCase,
  ListPartsUseCase,
  CreateRepairUseCase,
  UpdateRepairUseCase,
  DeleteRepairUseCase,
  AddPartToRepairUseCase,
  RemovePartFromRepairUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([RepairEntity, RepairPartEntity, PartEntity]),
  ],
  controllers: [RepairController],
  providers: [
    {
      provide: REPAIR_REPOSITORY,
      useClass: RepairRepositoryTypeORM,
    },
    ...REPAIR_USE_CASES,
  ],
  exports: [REPAIR_REPOSITORY],
})
export class RepairModule {}
