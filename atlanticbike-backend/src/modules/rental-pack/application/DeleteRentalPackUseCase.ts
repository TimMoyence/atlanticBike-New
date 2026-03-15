import { Inject, Injectable } from '@nestjs/common';
import type { IRentalPackRepository } from '../domain/IRentalPackRepository';
import { RENTAL_PACK_REPOSITORY } from '../domain/tokens';

@Injectable()
export class DeleteRentalPackUseCase {
  constructor(
    @Inject(RENTAL_PACK_REPOSITORY)
    private readonly repo: IRentalPackRepository,
  ) {}

  execute(id: number) {
    return this.repo.delete(id);
  }
}
