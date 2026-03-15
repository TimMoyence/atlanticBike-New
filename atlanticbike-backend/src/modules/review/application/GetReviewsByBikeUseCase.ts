import { Inject, Injectable } from '@nestjs/common';
import type { IReviewRepository } from '../domain/IReviewRepository';
import { REVIEW_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetReviewsByBikeUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly repo: IReviewRepository,
  ) {}

  execute(bikeId: number) {
    return this.repo.findByBike(bikeId);
  }
}
