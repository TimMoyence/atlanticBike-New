import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IRentalPackRepository } from '../domain/IRentalPackRepository';
import { RENTAL_PACK_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetRentalPackByIdUseCase {
  constructor(
    @Inject(RENTAL_PACK_REPOSITORY)
    private readonly repo: IRentalPackRepository,
  ) {}

  async execute(id: number) {
    const pack = await this.repo.findById(id);
    if (!pack) {
      throw new NotFoundException(`Rental pack with id ${id} not found`);
    }
    return pack;
  }
}
