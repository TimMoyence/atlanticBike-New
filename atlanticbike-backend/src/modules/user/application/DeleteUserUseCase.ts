import { Inject, Injectable } from '@nestjs/common';
import type { IUserRepository } from '../domain/IUserRepository';
import { USER_REPOSITORY } from '../domain/tokens';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repo: IUserRepository,
  ) {}

  execute(id: number) {
    return this.repo.delete(id);
  }
}
