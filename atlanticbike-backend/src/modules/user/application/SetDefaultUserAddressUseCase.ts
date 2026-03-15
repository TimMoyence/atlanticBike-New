import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../domain/IUserRepository';
import { USER_REPOSITORY } from '../domain/tokens';

@Injectable()
export class SetDefaultUserAddressUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repo: IUserRepository,
  ) {}

  execute(userId: number, addressId: number) {
    return this.repo.setDefaultAddress(userId, addressId);
  }
}
