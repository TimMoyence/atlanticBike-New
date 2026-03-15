import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddUserAddressUseCase } from '../application/AddUserAddressUseCase';
import { CreateUserUseCase } from '../application/CreateUserUseCase';
import { DeleteUserUseCase } from '../application/DeleteUserUseCase';
import { GetUserByEmailUseCase } from '../application/GetUserByEmailUseCase';
import { GetUserByIdUseCase } from '../application/GetUserByIdUseCase';
import { ListUserAddressesUseCase } from '../application/ListUserAddressesUseCase';
import { ListUsersUseCase } from '../application/ListUsersUseCase';
import { RemoveUserAddressUseCase } from '../application/RemoveUserAddressUseCase';
import { SetDefaultUserAddressUseCase } from '../application/SetDefaultUserAddressUseCase';
import { UpdateUserAddressUseCase } from '../application/UpdateUserAddressUseCase';
import { UpdateUserUseCase } from '../application/UpdateUserUseCase';
import type {
  CreateUserAddressData,
  CreateUserData,
  UpdateUserAddressData,
  UpdateUserData,
} from '../domain/IUserRepository';
import type { UserRole } from '../domain/User';

const USER_ROLES: UserRole[] = ['admin', 'client', 'staff', 'mechanic'];

class CreateUserAddressDto implements CreateUserAddressData {
  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  postalCode: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

class UpdateUserAddressDto implements UpdateUserAddressData {
  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  postalCode?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}

class CreateUserDto implements CreateUserData {
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  passwordHash: string;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsOptional()
  @IsString()
  phone?: string | null;

  @IsIn(USER_ROLES)
  role: UserRole;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateUserAddressDto)
  addresses?: CreateUserAddressDto[];
}

class UpdateUserDto implements UpdateUserData {
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  passwordHash?: string;

  @IsOptional()
  @IsString()
  firstName?: string;

  @IsOptional()
  @IsString()
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string | null;

  @IsOptional()
  @IsIn(USER_ROLES)
  role?: UserRole;
}

class GetUserByEmailDto {
  @IsEmail()
  email: string;
}

@Controller('users')
export class UserController {
  constructor(
    private readonly listUsers: ListUsersUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly getUserByEmail: GetUserByEmailUseCase,
    private readonly createUser: CreateUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
    private readonly listAddresses: ListUserAddressesUseCase,
    private readonly addAddress: AddUserAddressUseCase,
    private readonly updateAddress: UpdateUserAddressUseCase,
    private readonly removeAddress: RemoveUserAddressUseCase,
    private readonly setDefaultAddress: SetDefaultUserAddressUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listUsers.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getUserById.execute(id);
  }

  @Get('by-email')
  findByEmail(@Query() query: GetUserByEmailDto) {
    return this.getUserByEmail.execute(query.email);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.createUser.execute(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserDto,
  ) {
    return this.updateUser.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteUser.execute(id);
  }

  @Get(':id/addresses')
  listUserAddresses(@Param('id', ParseIntPipe) id: number) {
    return this.listAddresses.execute(id);
  }

  @Post(':id/addresses')
  createAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateUserAddressDto,
  ) {
    return this.addAddress.execute(id, dto);
  }

  @Put(':id/addresses/:addressId')
  updateAddressHandler(
    @Param('addressId', ParseIntPipe) addressId: number,
    @Body() dto: UpdateUserAddressDto,
  ) {
    return this.updateAddress.execute(addressId, dto);
  }

  @Delete(':id/addresses/:addressId')
  removeAddressHandler(@Param('addressId', ParseIntPipe) addressId: number) {
    return this.removeAddress.execute(addressId);
  }

  @Patch(':id/addresses/:addressId/default')
  setDefaultAddressHandler(
    @Param('id', ParseIntPipe) id: number,
    @Param('addressId', ParseIntPipe) addressId: number,
  ) {
    return this.setDefaultAddress.execute(id, addressId);
  }
}
