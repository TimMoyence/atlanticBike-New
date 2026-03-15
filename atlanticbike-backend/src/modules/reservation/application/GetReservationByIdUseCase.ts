import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IReservationRepository } from '../domain/IReservationRepository';
import { RESERVATION_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetReservationByIdUseCase {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly repo: IReservationRepository,
  ) {}

  async execute(id: number) {
    const reservation = await this.repo.findById(id);
    if (!reservation) {
      throw new NotFoundException(`Reservation with id ${id} not found`);
    }
    return reservation;
  }
}
