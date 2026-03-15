import { Inject, Injectable } from '@nestjs/common';
import type { CreateReservationData, IReservationRepository } from '../domain/IReservationRepository';
import { RESERVATION_REPOSITORY } from '../domain/tokens';

@Injectable()
export class CreateReservationUseCase {
  constructor(
    @Inject(RESERVATION_REPOSITORY)
    private readonly repo: IReservationRepository,
  ) {}

  async execute(data: CreateReservationData) {
    return this.repo.create(data);
  }
}
