import { Inject, Injectable } from '@nestjs/common';
import type { CreateBikeData, IBikeRepository } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class CreateBikeUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  async execute(data: CreateBikeData) {
    return this.repo.create(data);
  }
}
