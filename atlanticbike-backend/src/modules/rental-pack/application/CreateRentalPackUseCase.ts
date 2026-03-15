import { Inject, Injectable } from '@nestjs/common';
import type { CreateRentalPackData, IRentalPackRepository } from '../domain/IRentalPackRepository';
import { RENTAL_PACK_REPOSITORY } from '../domain/tokens';

@Injectable()
export class CreateRentalPackUseCase {
  constructor(
    @Inject(RENTAL_PACK_REPOSITORY)
    private readonly repo: IRentalPackRepository,
  ) {}
  async execute(data: CreateRentalPackData) {
    return this.repo.create(data);
  }
}
