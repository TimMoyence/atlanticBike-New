import { Inject, Injectable } from '@nestjs/common';
import type { CreateUserData, IUserRepository } from '../domain/IUserRepository';
import { USER_REPOSITORY } from '../domain/tokens';

@Injectable()
export class CreateUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY) private readonly repo: IUserRepository,
  ) {}

  async execute(data: CreateUserData) {
    return this.repo.create(data);
  }
}
