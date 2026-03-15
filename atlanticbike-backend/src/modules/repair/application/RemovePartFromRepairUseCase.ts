import { Inject, Injectable } from '@nestjs/common';
import type { IRepairRepository } from '../domain/IRepairRepository';
import { REPAIR_REPOSITORY } from '../domain/tokens';

@Injectable()
export class RemovePartFromRepairUseCase {
  constructor(
    @Inject(REPAIR_REPOSITORY) private readonly repo: IRepairRepository,
  ) {}

  execute(repairPartId: number) {
    return this.repo.removePartFromRepair(repairPartId);
  }
}
