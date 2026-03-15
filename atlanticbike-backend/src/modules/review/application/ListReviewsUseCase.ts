import { Inject, Injectable } from '@nestjs/common';
import type { IReviewRepository } from '../domain/IReviewRepository';
import { REVIEW_REPOSITORY } from '../domain/tokens';

@Injectable()
export class ListReviewsUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly repo: IReviewRepository,
  ) {}

  execute() {
    return this.repo.findAll();
  }
}
