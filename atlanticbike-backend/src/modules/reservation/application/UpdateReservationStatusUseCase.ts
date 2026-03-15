import { Inject, Injectable } from '@nestjs/common';
import type { IReservationRepository } from '../domain/IReservationRepository';
import type { ReservationStatus } from '../domain/Reservation';
import { RESERVATION_REPOSITORY } from '../domain/tokens';

@Injectable()
export class UpdateReservationStatusUseCase {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly repo: IReservationRepository,
  ) {}

  execute(id: number, status: ReservationStatus) {
    return this.repo.updateStatus(id, status);
  }
}
