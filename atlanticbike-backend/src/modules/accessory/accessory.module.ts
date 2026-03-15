import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdjustAccessoryStockUseCase } from './application/AdjustAccessoryStockUseCase';
import { CreateAccessoryUseCase } from './application/CreateAccessoryUseCase';
import { DeleteAccessoryUseCase } from './application/DeleteAccessoryUseCase';
import { GetAccessoryByIdUseCase } from './application/GetAccessoryByIdUseCase';
import { ListAccessoriesUseCase } from './application/ListAccessoriesUseCase';
import { UpdateAccessoryUseCase } from './application/UpdateAccessoryUseCase';
import { ACCESSORY_REPOSITORY } from './domain/tokens';
import { AccessoryController } from './interfaces/AccessoryController';
import { AccessoryRepositoryTypeORM } from './infrastructure/AccessoryRepositoryTypeORM';
import { AccessoryEntity } from './infrastructure/entities/Accessory.entity';

const ACCESSORY_USE_CASES = [
  ListAccessoriesUseCase,
  GetAccessoryByIdUseCase,
  CreateAccessoryUseCase,
  UpdateAccessoryUseCase,
  DeleteAccessoryUseCase,
  AdjustAccessoryStockUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([AccessoryEntity])],
  controllers: [AccessoryController],
  providers: [
    {
      provide: ACCESSORY_REPOSITORY,
      useClass: AccessoryRepositoryTypeORM,
    },
    ...ACCESSORY_USE_CASES,
  ],
  exports: [ACCESSORY_REPOSITORY],
})
export class AccessoryModule {}
