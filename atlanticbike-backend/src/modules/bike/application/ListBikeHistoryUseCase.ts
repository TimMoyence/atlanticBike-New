import { Inject, Injectable } from '@nestjs/common';
import type { IBikeRepository } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class ListBikeHistoryUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  execute(bikeId: number) {
    return this.repo.listHistory(bikeId);
  }
}
