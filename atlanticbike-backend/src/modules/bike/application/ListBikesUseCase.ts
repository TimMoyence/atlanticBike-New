import { Inject, Injectable } from '@nestjs/common';
import type { IBikeRepository } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class ListBikesUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  execute() {
    return this.repo.findAll();
  }
}
