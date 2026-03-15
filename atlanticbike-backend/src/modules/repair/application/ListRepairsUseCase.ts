import { Inject, Injectable } from '@nestjs/common';
import type { IRepairRepository } from '../domain/IRepairRepository';
import { REPAIR_REPOSITORY } from '../domain/tokens';

@Injectable()
export class ListRepairsUseCase {
  constructor(
    @Inject(REPAIR_REPOSITORY) private readonly repo: IRepairRepository,
  ) {}

  execute() {
    return this.repo.findAll();
  }
}
