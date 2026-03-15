import { Inject, Injectable } from '@nestjs/common';
import type { IReviewRepository } from '../domain/IReviewRepository';
import { REVIEW_REPOSITORY } from '../domain/tokens';

@Injectable()
export class DeleteReviewUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly repo: IReviewRepository,
  ) {}

  execute(id: number) {
    return this.repo.delete(id);
  }
}
