import { Inject, Injectable } from '@nestjs/common';
import type { CreateBikePhotoData, IBikeRepository } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class AddBikePhotoUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  execute(bikeId: number, data: CreateBikePhotoData) {
    return this.repo.addPhoto(bikeId, data);
  }
}
