import { Inject, Injectable } from '@nestjs/common';
import type { CreateBikeHistoryData, IBikeRepository } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class AddBikeHistoryUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  execute(bikeId: number, data: CreateBikeHistoryData) {
    return this.repo.addHistory(bikeId, data);
  }
}
