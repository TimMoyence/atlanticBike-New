import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsIn,
  IsNumber,
  IsOptional,
  IsPositive,
} from 'class-validator';
import { CreateReservationUseCase } from '../application/CreateReservationUseCase';
import { DeleteReservationUseCase } from '../application/DeleteReservationUseCase';
import { GetActiveReservationsByBikeUseCase } from '../application/GetActiveReservationsByBikeUseCase';
import { GetReservationByIdUseCase } from '../application/GetReservationByIdUseCase';
import { GetReservationsByUserUseCase } from '../application/GetReservationsByUserUseCase';
import { ListReservationsUseCase } from '../application/ListReservationsUseCase';
import { UpdateReservationStatusUseCase } from '../application/UpdateReservationStatusUseCase';
import { UpdateReservationUseCase } from '../application/UpdateReservationUseCase';
import type {
  CreateReservationData,
  UpdateReservationData,
} from '../domain/IReservationRepository';
import type { ReservationStatus } from '../domain/Reservation';

const RESERVATION_STATUSES: ReservationStatus[] = [
  'pending',
  'confirmed',
  'cancelled',
  'completed',
];

class CreateReservationDto implements CreateReservationData {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  userId: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  bikeId: number;

  @IsDateString()
  startDate: Date;

  @IsDateString()
  endDate: Date;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  totalPrice: number;

  @IsOptional()
  @IsIn(RESERVATION_STATUSES)
  status?: ReservationStatus;
}

class UpdateReservationDto implements UpdateReservationData {
  @IsOptional()
  @IsDateString()
  startDate?: Date;

  @IsOptional()
  @IsDateString()
  endDate?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  totalPrice?: number;

  @IsOptional()
  @IsIn(RESERVATION_STATUSES)
  status?: ReservationStatus;
}

class UpdateReservationStatusDto {
  @IsIn(RESERVATION_STATUSES)
  status: ReservationStatus;
}

@Controller('reservations')
export class ReservationController {
  constructor(
    private readonly listReservations: ListReservationsUseCase,
    private readonly getReservationById: GetReservationByIdUseCase,
    private readonly getByUser: GetReservationsByUserUseCase,
    private readonly getActiveByBike: GetActiveReservationsByBikeUseCase,
    private readonly createReservation: CreateReservationUseCase,
    private readonly updateReservation: UpdateReservationUseCase,
    private readonly updateReservationStatus: UpdateReservationStatusUseCase,
    private readonly deleteReservation: DeleteReservationUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listReservations.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getReservationById.execute(id);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.getByUser.execute(userId);
  }

  @Get('bike/:bikeId/active')
  findActiveByBike(@Param('bikeId', ParseIntPipe) bikeId: number) {
    return this.getActiveByBike.execute(bikeId);
  }

  @Post()
  create(@Body() dto: CreateReservationDto) {
    return this.createReservation.execute(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservationDto,
  ) {
    return this.updateReservation.execute(id, dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReservationStatusDto,
  ) {
    return this.updateReservationStatus.execute(id, dto.status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteReservation.execute(id);
  }
}
