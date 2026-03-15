import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import {
  CreateReservationData,
  IReservationRepository,
  UpdateReservationData,
} from '../domain/IReservationRepository';
import { Reservation, ReservationStatus } from '../domain/Reservation';
import { ReservationEntity } from './entities/Reservation.entity';

@Injectable()
export class ReservationRepositoryTypeORM implements IReservationRepository {
  constructor(
    @InjectRepository(ReservationEntity)
    private readonly reservationRepo: Repository<ReservationEntity>,
  ) {}

  async findAll(): Promise<Reservation[]> {
    const reservations = await this.reservationRepo.find({
      order: { id: 'ASC' },
    });
    return reservations.map((entity) => this.toDomain(entity));
  }

  async findById(id: number): Promise<Reservation | null> {
    const reservation = await this.reservationRepo.findOne({ where: { id } });
    return reservation ? this.toDomain(reservation) : null;
  }

  async findByUser(userId: number): Promise<Reservation[]> {
    const reservations = await this.reservationRepo.find({
      where: { userId },
      order: { startDate: 'DESC' },
    });
    return reservations.map((entity) => this.toDomain(entity));
  }

  async findActiveByBike(bikeId: number): Promise<Reservation[]> {
    const reservations = await this.reservationRepo.find({
      where: {
        bikeId,
        status: In<ReservationStatus>(['pending', 'confirmed']),
      },
      order: { startDate: 'ASC' },
    });
    return reservations.map((entity) => this.toDomain(entity));
  }

  async create(data: CreateReservationData): Promise<Reservation> {
    const entity = this.reservationRepo.create({
      userId: data.userId,
      bikeId: data.bikeId,
      startDate: data.startDate,
      endDate: data.endDate,
      totalPrice: data.totalPrice.toString(),
      status: data.status ?? 'pending',
    });

    const saved = await this.reservationRepo.save(entity);
    return this.toDomain(saved);
  }

  async update(
    id: number,
    data: UpdateReservationData,
  ): Promise<Reservation> {
    const existing = await this.reservationRepo.findOne({ where: { id } });
    if (!existing) {
      throw new Error(`Reservation with id ${id} not found`);
    }

    await this.reservationRepo.update(id, {
      startDate: data.startDate ?? existing.startDate,
      endDate: data.endDate ?? existing.endDate,
      totalPrice:
        data.totalPrice === undefined
          ? existing.totalPrice
          : data.totalPrice.toString(),
      status: data.status ?? existing.status,
    });

    const updated = await this.reservationRepo.findOne({ where: { id } });
    if (!updated) {
      throw new Error('Failed to load reservation after update');
    }
    return this.toDomain(updated);
  }

  async updateStatus(
    id: number,
    status: ReservationStatus,
  ): Promise<Reservation> {
    const reservation = await this.reservationRepo.findOne({ where: { id } });
    if (!reservation) {
      throw new Error(`Reservation with id ${id} not found`);
    }
    reservation.status = status;
    const saved = await this.reservationRepo.save(reservation);
    return this.toDomain(saved);
  }

  async delete(id: number): Promise<void> {
    await this.reservationRepo.delete(id);
  }

  private toDomain(entity: ReservationEntity): Reservation {
    const reservation = new Reservation();
    reservation.id = entity.id;
    reservation.userId = entity.userId;
    reservation.bikeId = entity.bikeId;
    reservation.startDate = entity.startDate;
    reservation.endDate = entity.endDate;
    reservation.totalPrice = Number(entity.totalPrice);
    reservation.status = entity.status as ReservationStatus;
    reservation.createdAt = entity.createdAt;
    return reservation;
  }
}
