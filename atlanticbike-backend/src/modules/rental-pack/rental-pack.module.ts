import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddPackItemUseCase } from './application/AddPackItemUseCase';
import { CreateRentalPackUseCase } from './application/CreateRentalPackUseCase';
import { DeleteRentalPackUseCase } from './application/DeleteRentalPackUseCase';
import { GetRentalPackByIdUseCase } from './application/GetRentalPackByIdUseCase';
import { ListRentalPacksUseCase } from './application/ListRentalPacksUseCase';
import { RemovePackItemUseCase } from './application/RemovePackItemUseCase';
import { UpdateRentalPackUseCase } from './application/UpdateRentalPackUseCase';
import { RENTAL_PACK_REPOSITORY } from './domain/tokens';
import { RentalPackController } from './interfaces/RentalPackController';
import { RentalPackRepositoryTypeORM } from './infrastructure/RentalPackRepositoryTypeORM';
import { PackItemEntity } from './infrastructure/entities/PackItem.entity';
import { RentalPackEntity } from './infrastructure/entities/RentalPack.entity';

const RENTAL_PACK_USE_CASES = [
  ListRentalPacksUseCase,
  GetRentalPackByIdUseCase,
  CreateRentalPackUseCase,
  UpdateRentalPackUseCase,
  DeleteRentalPackUseCase,
  AddPackItemUseCase,
  RemovePackItemUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([RentalPackEntity, PackItemEntity])],
  controllers: [RentalPackController],
  providers: [
    {
      provide: RENTAL_PACK_REPOSITORY,
      useClass: RentalPackRepositoryTypeORM,
    },
    ...RENTAL_PACK_USE_CASES,
  ],
  exports: [RENTAL_PACK_REPOSITORY],
})
export class RentalPackModule {}
