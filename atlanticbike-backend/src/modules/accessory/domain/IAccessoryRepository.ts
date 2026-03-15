import { Accessory } from './Accessory';

export interface CreateAccessoryData {
  name: string;
  description?: string | null;
  stockQuantity: number;
  price: number;
}

export interface UpdateAccessoryData extends Partial<CreateAccessoryData> {}

export interface IAccessoryRepository {
  findAll(): Promise<Accessory[]>;
  findById(id: number): Promise<Accessory | null>;
  create(data: CreateAccessoryData): Promise<Accessory>;
  update(id: number, data: UpdateAccessoryData): Promise<Accessory>;
  delete(id: number): Promise<void>;
  adjustStock(id: number, delta: number): Promise<Accessory>;
}
