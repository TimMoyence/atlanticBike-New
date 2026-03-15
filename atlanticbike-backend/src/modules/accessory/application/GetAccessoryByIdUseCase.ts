import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import type { IAccessoryRepository } from '../domain/IAccessoryRepository';
import { ACCESSORY_REPOSITORY } from '../domain/tokens';

@Injectable()
export class GetAccessoryByIdUseCase {
  constructor(
    @Inject(ACCESSORY_REPOSITORY) private readonly repo: IAccessoryRepository,
  ) {}

  async execute(id: number) {
    const accessory = await this.repo.findById(id);
    if (!accessory) {
      throw new NotFoundException(`Accessory with id ${id} not found`);
    }
    return accessory;
  }
}
