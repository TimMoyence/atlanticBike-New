import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository, UpdateUserAddressData } from '../domain/IUserRepository';
import { USER_REPOSITORY } from '../domain/tokens';

@Injectable()
export class UpdateUserAddressUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repo: IUserRepository,
  ) {}

  execute(addressId: number, data: UpdateUserAddressData) {
    return this.repo.updateAddress(addressId, data);
  }
}
