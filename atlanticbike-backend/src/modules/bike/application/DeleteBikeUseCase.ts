import { Inject, Injectable } from '@nestjs/common';
import type { IBikeRepository } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class DeleteBikeUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  execute(id: number) {
    return this.repo.delete(id);
  }
}
