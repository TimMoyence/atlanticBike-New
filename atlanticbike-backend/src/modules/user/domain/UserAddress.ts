import { User } from './User';

export class UserAddress {
  id: number;
  userId: number;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
  user?: User;
}
