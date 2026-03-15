import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IRepairRepository } from '../domain/IRepairRepository';
import { REPAIR_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetRepairByIdUseCase {
  constructor(
    @Inject(REPAIR_REPOSITORY) private readonly repo: IRepairRepository,
  ) {}

  async execute(id: number) {
    const repair = await this.repo.findById(id);
    if (!repair) {
      throw new NotFoundException(`Repair with id ${id} not found`);
    }
    return repair;
  }
}
