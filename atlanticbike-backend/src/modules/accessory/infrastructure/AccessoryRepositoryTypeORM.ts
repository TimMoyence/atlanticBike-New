import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateAccessoryData,
  IAccessoryRepository,
  UpdateAccessoryData,
} from '../domain/IAccessoryRepository';
import { Accessory } from '../domain/Accessory';
import { AccessoryEntity } from './entities/Accessory.entity';

@Injectable()
export class AccessoryRepositoryTypeORM implements IAccessoryRepository {
  constructor(
    @InjectRepository(AccessoryEntity)
    private readonly accessoryRepo: Repository<AccessoryEntity>,
  ) {}

  async findAll(): Promise<Accessory[]> {
    const accessories = await this.accessoryRepo.find({
      order: { id: 'ASC' },
    });
    return accessories.map((entity) => this.toDomain(entity));
  }

  async findById(id: number): Promise<Accessory | null> {
    const accessory = await this.accessoryRepo.findOne({ where: { id } });
    return accessory ? this.toDomain(accessory) : null;
  }

  async create(data: CreateAccessoryData): Promise<Accessory> {
    const entity = this.accessoryRepo.create({
      name: data.name,
      description: data.description ?? null,
      stockQuantity: data.stockQuantity,
      price: data.price.toString(),
    });

    const saved = await this.accessoryRepo.save(entity);
    return this.toDomain(saved);
  }

  async update(id: number, data: UpdateAccessoryData): Promise<Accessory> {
    const existing = await this.accessoryRepo.findOne({ where: { id } });
    if (!existing) {
      throw new Error(`Accessory with id ${id} not found`);
    }

    await this.accessoryRepo.update(id, {
      name: data.name ?? existing.name,
      description:
        data.description === undefined ? existing.description : data.description,
      stockQuantity: data.stockQuantity ?? existing.stockQuantity,
      price:
        data.price === undefined ? existing.price : data.price.toString(),
    });

    const updated = await this.accessoryRepo.findOne({ where: { id } });
    if (!updated) {
      throw new Error('Failed to load accessory after update');
    }
    return this.toDomain(updated);
  }

  async delete(id: number): Promise<void> {
    await this.accessoryRepo.delete(id);
  }

  async adjustStock(id: number, delta: number): Promise<Accessory> {
    const accessory = await this.accessoryRepo.findOne({ where: { id } });
    if (!accessory) {
      throw new Error(`Accessory with id ${id} not found`);
    }

    const newQuantity = accessory.stockQuantity + delta;
    if (newQuantity < 0) {
      throw new Error('Stock quantity cannot be negative');
    }

    accessory.stockQuantity = newQuantity;
    const saved = await this.accessoryRepo.save(accessory);
    return this.toDomain(saved);
  }

  private toDomain(entity: AccessoryEntity): Accessory {
    const accessory = new Accessory();
    accessory.id = entity.id;
    accessory.name = entity.name;
    accessory.description = entity.description;
    accessory.stockQuantity = entity.stockQuantity;
    accessory.price = Number(entity.price);
    accessory.createdAt = entity.createdAt;
    accessory.updatedAt = entity.updatedAt;
    return accessory;
  }
}
