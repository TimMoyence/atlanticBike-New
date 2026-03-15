import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IBikeRepository } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetBikeByFrameNumberUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  async execute(frameNumber: string) {
    const bike = await this.repo.findByFrameNumber(frameNumber);
    if (!bike) {
      throw new NotFoundException(
        `Bike with frame number ${frameNumber} not found`,
      );
    }
    return bike;
  }
}
