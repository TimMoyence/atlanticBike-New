import { Inject, Injectable } from '@nestjs/common';
import type { IReservationRepository } from '../domain/IReservationRepository';
import { RESERVATION_REPOSITORY } from '../domain/tokens';

@Injectable()
export class DeleteReservationUseCase {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly repo: IReservationRepository,
  ) {}

  execute(id: number) {
    return this.repo.delete(id);
  }
}
