import { Inject, Injectable } from '@nestjs/common';
import type { IBikeRepository } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class SetBikeMainPhotoUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  execute(bikeId: number, photoId: number) {
    return this.repo.setMainPhoto(bikeId, photoId);
  }
}
