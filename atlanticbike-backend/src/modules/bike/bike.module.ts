import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddBikeHistoryUseCase } from './application/AddBikeHistoryUseCase';
import { AddBikePhotoUseCase } from './application/AddBikePhotoUseCase';
import { CreateBikeUseCase } from './application/CreateBikeUseCase';
import { DeleteBikeUseCase } from './application/DeleteBikeUseCase';
import { GetBikeByFrameNumberUseCase } from './application/GetBikeByFrameNumberUseCase';
import { GetBikeByIdUseCase } from './application/GetBikeByIdUseCase';
import { ListBikeHistoryUseCase } from './application/ListBikeHistoryUseCase';
import { ListBikesUseCase } from './application/ListBikesUseCase';
import { RemoveBikePhotoUseCase } from './application/RemoveBikePhotoUseCase';
import { SetBikeMainPhotoUseCase } from './application/SetBikeMainPhotoUseCase';
import { UpdateBikeUseCase } from './application/UpdateBikeUseCase';
import { BIKE_REPOSITORY } from './domain/tokens';
import { BikeController } from './interfaces/BikeController';
import { BikeRepositoryTypeORM } from './infrastructure/BikeRepositoryTypeORM';
import { BikeCategoryEntity } from './infrastructure/entities/BikeCategory.entity';
import { BikeEntity } from './infrastructure/entities/Bike.entity';
import { BikeHistoryEntity } from './infrastructure/entities/BikeHistory.entity';
import { BikePhotoEntity } from './infrastructure/entities/BikePhoto.entity';

const BIKE_USE_CASES = [
  ListBikesUseCase,
  GetBikeByIdUseCase,
  GetBikeByFrameNumberUseCase,
  CreateBikeUseCase,
  UpdateBikeUseCase,
  DeleteBikeUseCase,
  AddBikePhotoUseCase,
  RemoveBikePhotoUseCase,
  SetBikeMainPhotoUseCase,
  AddBikeHistoryUseCase,
  ListBikeHistoryUseCase,
];

@Module({
  imports: [
    TypeOrmModule.forFeature([
      BikeEntity,
      BikePhotoEntity,
      BikeHistoryEntity,
      BikeCategoryEntity,
    ]),
  ],
  controllers: [BikeController],
  providers: [
    {
      provide: BIKE_REPOSITORY,
      useClass: BikeRepositoryTypeORM,
    },
    ...BIKE_USE_CASES,
  ],
  exports: [BIKE_REPOSITORY],
})
export class BikeModule {}
