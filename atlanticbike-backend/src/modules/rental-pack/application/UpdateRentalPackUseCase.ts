import { Inject, Injectable } from '@nestjs/common';
import type { IRentalPackRepository, UpdateRentalPackData } from '../domain/IRentalPackRepository';
import { RENTAL_PACK_REPOSITORY } from '../domain/tokens';

@Injectable()
export class UpdateRentalPackUseCase {
  constructor(
    @Inject(RENTAL_PACK_REPOSITORY)
    private readonly repo: IRentalPackRepository,
  ) {}

  execute(id: number, data: UpdateRentalPackData) {
    return this.repo.update(id, data);
  }
}
