import { Inject, Injectable } from '@nestjs/common';
import type { IReservationRepository } from '../domain/IReservationRepository';
import { RESERVATION_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetReservationsByUserUseCase {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly repo: IReservationRepository,
  ) {}

  execute(userId: number) {
    return this.repo.findByUser(userId);
  }
}
