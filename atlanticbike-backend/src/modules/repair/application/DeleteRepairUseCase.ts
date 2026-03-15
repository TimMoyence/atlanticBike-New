import { Inject, Injectable } from '@nestjs/common';
import type { IRepairRepository } from '../domain/IRepairRepository';
import { REPAIR_REPOSITORY } from '../domain/tokens';

@Injectable()
export class DeleteRepairUseCase {
  constructor(
    @Inject(REPAIR_REPOSITORY) private readonly repo: IRepairRepository,
  ) {}

  execute(id: number) {
    return this.repo.delete(id);
  }
}
