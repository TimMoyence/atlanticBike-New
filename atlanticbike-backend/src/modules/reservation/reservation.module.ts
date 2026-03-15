import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateReservationUseCase } from './application/CreateReservationUseCase';
import { DeleteReservationUseCase } from './application/DeleteReservationUseCase';
import { GetActiveReservationsByBikeUseCase } from './application/GetActiveReservationsByBikeUseCase';
import { GetReservationByIdUseCase } from './application/GetReservationByIdUseCase';
import { GetReservationsByUserUseCase } from './application/GetReservationsByUserUseCase';
import { ListReservationsUseCase } from './application/ListReservationsUseCase';
import { UpdateReservationStatusUseCase } from './application/UpdateReservationStatusUseCase';
import { UpdateReservationUseCase } from './application/UpdateReservationUseCase';
import { RESERVATION_REPOSITORY } from './domain/tokens';
import { ReservationController } from './interfaces/ReservationController';
import { ReservationRepositoryTypeORM } from './infrastructure/ReservationRepositoryTypeORM';
import { ReservationEntity } from './infrastructure/entities/Reservation.entity';

const RESERVATION_USE_CASES = [
  ListReservationsUseCase,
  GetReservationByIdUseCase,
  GetReservationsByUserUseCase,
  GetActiveReservationsByBikeUseCase,
  CreateReservationUseCase,
  UpdateReservationUseCase,
  UpdateReservationStatusUseCase,
  DeleteReservationUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([ReservationEntity])],
  controllers: [ReservationController],
  providers: [
    {
      provide: RESERVATION_REPOSITORY,
      useClass: ReservationRepositoryTypeORM,
    },
    ...RESERVATION_USE_CASES,
  ],
  exports: [RESERVATION_REPOSITORY],
})
export class ReservationModule {}
