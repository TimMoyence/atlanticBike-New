import { Inject, Injectable } from '@nestjs/common';
import type { IReviewRepository } from '../domain/IReviewRepository';
import type { ReviewStatus } from '../domain/Review';
import { REVIEW_REPOSITORY } from '../domain/tokens';

@Injectable()
export class UpdateReviewStatusUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly repo: IReviewRepository,
  ) {}

  execute(id: number, status: ReviewStatus) {
    return this.repo.updateStatus(id, status);
  }
}
