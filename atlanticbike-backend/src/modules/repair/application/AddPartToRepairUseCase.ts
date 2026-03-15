import { Inject, Injectable } from '@nestjs/common';
import type { CreateRepairPartData, IRepairRepository } from '../domain/IRepairRepository';
import { REPAIR_REPOSITORY } from '../domain/tokens';

@Injectable()
export class AddPartToRepairUseCase {
  constructor(
    @Inject(REPAIR_REPOSITORY) private readonly repo: IRepairRepository,
  ) {}

  execute(repairId: number, data: CreateRepairPartData) {
    return this.repo.addPartToRepair(repairId, data);
  }
}
