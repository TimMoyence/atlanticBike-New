import { Inject, Injectable } from '@nestjs/common';
import type { CreateReviewData, IReviewRepository } from '../domain/IReviewRepository';
import { REVIEW_REPOSITORY } from '../domain/tokens';

@Injectable()
export class CreateReviewUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY)
    private readonly repo: IReviewRepository,
  ) {}
  async execute(data: CreateReviewData) {
    return this.repo.create(data);
  }
}
