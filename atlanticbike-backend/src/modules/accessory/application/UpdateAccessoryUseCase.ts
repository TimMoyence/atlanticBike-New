import { Inject, Injectable } from '@nestjs/common';
import type { IAccessoryRepository, UpdateAccessoryData } from '../domain/IAccessoryRepository';
import { ACCESSORY_REPOSITORY } from '../domain/tokens';

@Injectable()
export class UpdateAccessoryUseCase {
  constructor(
    @Inject(ACCESSORY_REPOSITORY) private readonly repo: IAccessoryRepository,
  ) {}

  execute(id: number, data: UpdateAccessoryData) {
    return this.repo.update(id, data);
  }
}
