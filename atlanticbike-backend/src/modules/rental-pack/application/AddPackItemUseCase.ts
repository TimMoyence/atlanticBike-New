import { Inject, Injectable } from '@nestjs/common';
import type { CreatePackItemData, IRentalPackRepository } from '../domain/IRentalPackRepository';
import { RENTAL_PACK_REPOSITORY } from '../domain/tokens';

@Injectable()
export class AddPackItemUseCase {
  constructor(
    @Inject(RENTAL_PACK_REPOSITORY)
    private readonly repo: IRentalPackRepository,
  ) {}

  execute(packId: number, data: CreatePackItemData) {
    return this.repo.addItem(packId, data);
  }
}
