import { Inject, Injectable } from '@nestjs/common';
import type { IBikeRepository } from '../domain/IBikeRepository';
import { BIKE_REPOSITORY } from '../domain/tokens';

@Injectable()
export class RemoveBikePhotoUseCase {
  constructor(
    @Inject(BIKE_REPOSITORY) private readonly repo: IBikeRepository,
  ) {}

  execute(photoId: number) {
    return this.repo.removePhoto(photoId);
  }
}
