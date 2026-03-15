import { UserAddress } from './UserAddress';

export type UserRole = 'admin' | 'client' | 'staff' | 'mechanic';

export class User {
  id: number;
  email: string;
  passwordHash: string;
  firstName: string;
  lastName: string;
  phone: string | null;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  addresses?: UserAddress[];
}
