import { Inject, Injectable } from '@nestjs/common';
import type { IReviewRepository, UpdateReviewData } from '../domain/IReviewRepository';
import { REVIEW_REPOSITORY } from '../domain/tokens';

@Injectable()
export class UpdateReviewUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly repo: IReviewRepository,
  ) {}

  execute(id: number, data: UpdateReviewData) {
    return this.repo.update(id, data);
  }
}
