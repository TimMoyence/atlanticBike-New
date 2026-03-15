import { Inject, Injectable } from '@nestjs/common';
import type { IReviewRepository } from '../domain/IReviewRepository';
import { REVIEW_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetReviewsByUserUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly repo: IReviewRepository,
  ) {}

  execute(userId: number) {
    return this.repo.findByUser(userId);
  }
}
