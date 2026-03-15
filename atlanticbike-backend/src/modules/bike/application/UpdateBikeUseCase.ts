import { Inject, Injectable } from '@nestjs/common';
import type { IBikeRepository, UpdateBikeData } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class UpdateBikeUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  execute(id: number, data: UpdateBikeData) {
    return this.repo.update(id, data);
  }
}
