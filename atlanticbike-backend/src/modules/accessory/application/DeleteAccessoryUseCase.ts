import { Inject, Injectable } from '@nestjs/common';
import type { IAccessoryRepository } from '../domain/IAccessoryRepository';
import { ACCESSORY_REPOSITORY } from '../domain/tokens';

@Injectable()
export class DeleteAccessoryUseCase {
  constructor(
    @Inject(ACCESSORY_REPOSITORY) private readonly repo: IAccessoryRepository,
  ) {}

  execute(id: number) {
    return this.repo.delete(id);
  }
}
