import { PackItem } from './PackItem';

export class RentalPack {
  id: number;
  name: string;
  description: string | null;
  price: number;
  createdAt: Date;
  updatedAt: Date;
  items?: PackItem[];
}
