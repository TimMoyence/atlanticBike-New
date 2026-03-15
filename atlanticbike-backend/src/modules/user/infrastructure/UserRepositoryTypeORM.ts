import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateUserAddressData,
  CreateUserData,
  IUserRepository,
  UpdateUserAddressData,
  UpdateUserData,
} from '../domain/IUserRepository';
import { User, UserRole } from '../domain/User';
import { UserAddress } from '../domain/UserAddress';
import { UserEntity } from './entities/User.entity';
import { UserAddressEntity } from './entities/UserAddress.entity';

@Injectable()
export class UserRepositoryTypeORM implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    @InjectRepository(UserAddressEntity)
    private readonly addressRepo: Repository<UserAddressEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    const users = await this.userRepo.find({
      relations: ['addresses'],
      order: { id: 'ASC' },
    });
    return users.map((entity) => this.toDomainUser(entity));
  }

  async findById(id: number): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { id },
      relations: ['addresses'],
    });
    return user ? this.toDomainUser(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { email },
      relations: ['addresses'],
    });
    return user ? this.toDomainUser(user) : null;
  }

  async create(data: CreateUserData): Promise<User> {
    const { addresses = [], ...userData } = data;

    const userEntity = this.userRepo.create({
      ...userData,
      phone: userData.phone ?? null,
    });

    const savedUser = await this.userRepo.save(userEntity);

    if (addresses.length) {
      const addressEntities = addresses.map((address, index) =>
        this.addressRepo.create({
          userId: savedUser.id,
          address: address.address,
          city: address.city,
          postalCode: address.postalCode,
          country: address.country,
          isDefault: address.isDefault ?? index === 0,
        }),
      );

      const savedAddresses = await this.addressRepo.save(addressEntities);
      const defaultAddress = savedAddresses.find((addr) => addr.isDefault);

      if (defaultAddress) {
        await this.ensureSingleDefault(savedUser.id, defaultAddress.id);
      }
    }

    const created = await this.findById(savedUser.id);
    if (!created) {
      throw new Error('Failed to load user after creation');
    }

    return created;
  }

  async update(id: number, data: UpdateUserData): Promise<User> {
    const existing = await this.userRepo.findOne({ where: { id } });
    if (!existing) {
      throw new Error(`User with id ${id} not found`);
    }

    await this.userRepo.update(id, {
      ...data,
      phone: data.phone === undefined ? existing.phone : data.phone ?? null,
    });

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Failed to load user after update');
    }

    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.userRepo.delete(id);
  }

  async listAddresses(userId: number): Promise<UserAddress[]> {
    const addresses = await this.addressRepo.find({
      where: { userId },
      order: { isDefault: 'DESC', id: 'ASC' },
    });

    return addresses.map((address) => this.toDomainAddress(address));
  }

  async addAddress(
    userId: number,
    data: CreateUserAddressData,
  ): Promise<UserAddress> {
    await this.ensureUserExists(userId);

    const entity = this.addressRepo.create({
      userId,
      address: data.address,
      city: data.city,
      postalCode: data.postalCode,
      country: data.country,
      isDefault: data.isDefault ?? false,
    });

    const saved = await this.addressRepo.save(entity);

    if (saved.isDefault) {
      await this.ensureSingleDefault(userId, saved.id);
    }

    return this.toDomainAddress(saved);
  }

  async updateAddress(
    addressId: number,
    data: UpdateUserAddressData,
  ): Promise<UserAddress> {
    const existing = await this.addressRepo.findOne({ where: { id: addressId } });
    if (!existing) {
      throw new Error(`Address with id ${addressId} not found`);
    }

    await this.addressRepo.update(addressId, {
      address: data.address ?? existing.address,
      city: data.city ?? existing.city,
      postalCode: data.postalCode ?? existing.postalCode,
      country: data.country ?? existing.country,
      isDefault: data.isDefault ?? existing.isDefault,
    });

    if (data.isDefault) {
      await this.ensureSingleDefault(existing.userId, addressId);
    }

    const updated = await this.addressRepo.findOne({ where: { id: addressId } });
    if (!updated) {
      throw new Error('Failed to load address after update');
    }

    return this.toDomainAddress(updated);
  }

  async removeAddress(addressId: number): Promise<void> {
    await this.addressRepo.delete(addressId);
  }

  async setDefaultAddress(userId: number, addressId: number): Promise<void> {
    const address = await this.addressRepo.findOne({
      where: { id: addressId, userId },
    });

    if (!address) {
      throw new Error(`Address ${addressId} not found for user ${userId}`);
    }

    await this.addressRepo.update(addressId, { isDefault: true });
    await this.ensureSingleDefault(userId, addressId);
  }

  private async ensureUserExists(userId: number): Promise<void> {
    const exists = await this.userRepo.exist({ where: { id: userId } });
    if (!exists) {
      throw new Error(`User with id ${userId} not found`);
    }
  }

  private async ensureSingleDefault(
    userId: number,
    defaultAddressId: number,
  ): Promise<void> {
    await this.addressRepo
      .createQueryBuilder()
      .update()
      .set({ isDefault: false })
      .where('user_id = :userId AND id <> :addressId', {
        userId,
        addressId: defaultAddressId,
      })
      .execute();
  }

  private toDomainUser(entity: UserEntity): User {
    const user = new User();
    user.id = entity.id;
    user.email = entity.email;
    user.passwordHash = entity.passwordHash;
    user.firstName = entity.firstName;
    user.lastName = entity.lastName;
    user.phone = entity.phone;
    user.role = entity.role as UserRole;
    user.createdAt = entity.createdAt;
    user.updatedAt = entity.updatedAt;
    user.addresses = entity.addresses
      ? entity.addresses.map((address) => this.toDomainAddress(address))
      : [];
    return user;
  }

  private toDomainAddress(entity: UserAddressEntity): UserAddress {
    const address = new UserAddress();
    address.id = entity.id;
    address.userId = entity.userId;
    address.address = entity.address;
    address.city = entity.city;
    address.postalCode = entity.postalCode;
    address.country = entity.country;
    address.isDefault = entity.isDefault;
    return address;
  }
}
