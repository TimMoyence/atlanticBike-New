import { RentalPack } from './RentalPack';
import { PackItem } from './PackItem';

export interface CreatePackItemData {
  bikeId?: number | null;
  accessoryId?: number | null;
  quantity: number;
}

export interface CreateRentalPackData {
  name: string;
  description?: string | null;
  price: number;
  items?: CreatePackItemData[];
}

export interface UpdateRentalPackData
  extends Partial<Omit<CreateRentalPackData, 'items'>> {}

export interface IRentalPackRepository {
  findAll(): Promise<RentalPack[]>;
  findById(id: number): Promise<RentalPack | null>;
  create(data: CreateRentalPackData): Promise<RentalPack>;
  update(id: number, data: UpdateRentalPackData): Promise<RentalPack>;
  delete(id: number): Promise<void>;
  addItem(packId: number, data: CreatePackItemData): Promise<PackItem>;
  removeItem(itemId: number): Promise<void>;
}
