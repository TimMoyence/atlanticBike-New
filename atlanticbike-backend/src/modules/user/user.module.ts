import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddUserAddressUseCase } from './application/AddUserAddressUseCase';
import { CreateUserUseCase } from './application/CreateUserUseCase';
import { DeleteUserUseCase } from './application/DeleteUserUseCase';
import { GetUserByEmailUseCase } from './application/GetUserByEmailUseCase';
import { GetUserByIdUseCase } from './application/GetUserByIdUseCase';
import { ListUserAddressesUseCase } from './application/ListUserAddressesUseCase';
import { ListUsersUseCase } from './application/ListUsersUseCase';
import { RemoveUserAddressUseCase } from './application/RemoveUserAddressUseCase';
import { SetDefaultUserAddressUseCase } from './application/SetDefaultUserAddressUseCase';
import { UpdateUserAddressUseCase } from './application/UpdateUserAddressUseCase';
import { UpdateUserUseCase } from './application/UpdateUserUseCase';
import { USER_REPOSITORY } from './domain/tokens';
import { UserController } from './interfaces/UserController';
import { UserRepositoryTypeORM } from './infrastructure/UserRepositoryTypeORM';
import { UserAddressEntity } from './infrastructure/entities/UserAddress.entity';
import { UserEntity } from './infrastructure/entities/User.entity';

const USER_USE_CASES = [
  ListUsersUseCase,
  GetUserByIdUseCase,
  GetUserByEmailUseCase,
  CreateUserUseCase,
  UpdateUserUseCase,
  DeleteUserUseCase,
  ListUserAddressesUseCase,
  AddUserAddressUseCase,
  UpdateUserAddressUseCase,
  RemoveUserAddressUseCase,
  SetDefaultUserAddressUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserAddressEntity])],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryTypeORM,
    },
    ...USER_USE_CASES,
  ],
  exports: [USER_REPOSITORY],
})
export class UserModule {}
