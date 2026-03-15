import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IReviewRepository } from '../domain/IReviewRepository';
import { REVIEW_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetReviewByIdUseCase {
  constructor(
    @Inject(REVIEW_REPOSITORY) private readonly repo: IReviewRepository,
  ) {}

  async execute(id: number) {
    const review = await this.repo.findById(id);
    if (!review) {
      throw new NotFoundException(`Review with id ${id} not found`);
    }
    return review;
  }
}
