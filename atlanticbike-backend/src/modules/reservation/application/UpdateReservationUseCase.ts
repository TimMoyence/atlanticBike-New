import { Inject, Injectable } from '@nestjs/common';
import type { IReservationRepository, UpdateReservationData } from '../domain/IReservationRepository';
import { RESERVATION_REPOSITORY } from '../domain/tokens';

@Injectable()
export class UpdateReservationUseCase {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly repo: IReservationRepository,
  ) {}

  execute(id: number, data: UpdateReservationData) {
    return this.repo.update(id, data);
  }
}
