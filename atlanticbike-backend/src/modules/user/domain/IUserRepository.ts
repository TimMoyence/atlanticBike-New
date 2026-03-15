import { User, UserRole } from './User';
import { UserAddress } from './UserAddress';

export interface CreateUserAddressData {
  address: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export interface UpdateUserAddressData extends Partial<CreateUserAddressData> {}

export interface CreateUserData {
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone?: string | null;
  role: UserRole;
  addresses?: CreateUserAddressData[];
}

export interface UpdateUserData
  extends Partial<Omit<CreateUserData, 'addresses'>> {}

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(data: CreateUserData): Promise<User>;
  update(id: number, data: UpdateUserData): Promise<User>;
  delete(id: number): Promise<void>;
  listAddresses(userId: number): Promise<UserAddress[]>;
  addAddress(userId: number, data: CreateUserAddressData): Promise<UserAddress>;
  updateAddress(addressId: number, data: UpdateUserAddressData): Promise<UserAddress>;
  removeAddress(addressId: number): Promise<void>;
  setDefaultAddress(userId: number, addressId: number): Promise<void>;
}
