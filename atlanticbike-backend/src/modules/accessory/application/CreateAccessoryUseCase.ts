import { Inject, Injectable } from '@nestjs/common';
import type { CreateAccessoryData, IAccessoryRepository } from '../domain/IAccessoryRepository';
import { ACCESSORY_REPOSITORY } from '../domain/tokens';

@Injectable()
export class CreateAccessoryUseCase {
  constructor(
    @Inject(ACCESSORY_REPOSITORY) private readonly repo: IAccessoryRepository,
  ) {}

  async execute(data: CreateAccessoryData) {
    return this.repo.create(data);
  }
}
