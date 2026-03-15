import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IBikeRepository } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetBikeByIdUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  async execute(id: number) {
    const bike = await this.repo.findById(id);
    if (!bike) {
      throw new NotFoundException(`Bike with id ${id} not found`);
    }
    return bike;
  }
}
