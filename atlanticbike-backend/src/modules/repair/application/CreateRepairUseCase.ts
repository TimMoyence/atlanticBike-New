import { Inject, Injectable } from '@nestjs/common';
import type {
  CreateRepairData,
  IRepairRepository,
} from '../domain/IRepairRepository';
import { REPAIR_REPOSITORY } from '../domain/tokens';

@Injectable()
export class CreateRepairUseCase {
  constructor(
    @Inject(REPAIR_REPOSITORY)
    private readonly repo: IRepairRepository,
  ) {}
  async execute(data: CreateRepairData) {
    return this.repo.create(data);
  }
}
