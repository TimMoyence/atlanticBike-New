import { Inject, Injectable } from '@nestjs/common';
import type { IRepairRepository, UpdateRepairData } from '../domain/IRepairRepository';
import { REPAIR_REPOSITORY } from '../domain/tokens';

@Injectable()
export class UpdateRepairUseCase {
  constructor(
    @Inject(REPAIR_REPOSITORY) private readonly repo: IRepairRepository,
  ) {}

  execute(id: number, data: UpdateRepairData) {
    return this.repo.update(id, data);
  }
}
