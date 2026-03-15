import { Inject, Injectable } from '@nestjs/common';
import type { IReservationRepository } from '../domain/IReservationRepository';
import { RESERVATION_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetActiveReservationsByBikeUseCase {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly repo: IReservationRepository,
  ) {}

  execute(bikeId: number) {
    return this.repo.findActiveByBike(bikeId);
  }
}
