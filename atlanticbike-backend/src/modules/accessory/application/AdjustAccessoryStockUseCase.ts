import { Inject, Injectable } from '@nestjs/common';
import type { IAccessoryRepository } from '../domain/IAccessoryRepository';
import { ACCESSORY_REPOSITORY } from '../domain/tokens';

@Injectable()
export class AdjustAccessoryStockUseCase {
  constructor(
    @Inject(ACCESSORY_REPOSITORY) private readonly repo: IAccessoryRepository,
  ) {}

  execute(id: number, delta: number) {
    return this.repo.adjustStock(id, delta);
  }
}
