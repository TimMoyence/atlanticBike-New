import { Inject, Injectable } from '@nestjs/common';
import type { CreateUserAddressData, IUserRepository } from '../domain/IUserRepository';
import { USER_REPOSITORY } from '../domain/tokens';

@Injectable()
export class AddUserAddressUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repo: IUserRepository,
  ) {}

  execute(userId: number, data: CreateUserAddressData) {
    return this.repo.addAddress(userId, data);
  }
}
