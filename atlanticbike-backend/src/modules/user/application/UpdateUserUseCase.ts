import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository, UpdateUserData } from '../domain/IUserRepository';
import { USER_REPOSITORY } from '../domain/tokens';

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repo: IUserRepository,
  ) {}

  execute(id: number, data: UpdateUserData) {
    return this.repo.update(id, data);
  }
}
