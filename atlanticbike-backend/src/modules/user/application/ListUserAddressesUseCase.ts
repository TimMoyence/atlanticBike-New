import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../domain/IUserRepository';
import { USER_REPOSITORY } from '../domain/tokens';

@Injectable()
export class ListUserAddressesUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repo: IUserRepository,
  ) {}

  execute(userId: number) {
    return this.repo.listAddresses(userId);
  }
}
