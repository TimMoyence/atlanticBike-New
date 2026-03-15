import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreatePackItemData,
  CreateRentalPackData,
  IRentalPackRepository,
  UpdateRentalPackData,
} from '../domain/IRentalPackRepository';
import { RentalPack } from '../domain/RentalPack';
import { PackItem } from '../domain/PackItem';
import { RentalPackEntity } from './entities/RentalPack.entity';
import { PackItemEntity } from './entities/PackItem.entity';

@Injectable()
export class RentalPackRepositoryTypeORM implements IRentalPackRepository {
  constructor(
    @InjectRepository(RentalPackEntity)
    private readonly packRepo: Repository<RentalPackEntity>,
    @InjectRepository(PackItemEntity)
    private readonly itemRepo: Repository<PackItemEntity>,
  ) {}

  async findAll(): Promise<RentalPack[]> {
    const packs = await this.packRepo.find({
      relations: ['items'],
      order: { name: 'ASC' },
    });
    return packs.map((entity) => this.toDomainPack(entity));
  }

  async findById(id: number): Promise<RentalPack | null> {
    const pack = await this.packRepo.findOne({
      where: { id },
      relations: ['items'],
    });
    return pack ? this.toDomainPack(pack) : null;
  }

  async create(data: CreateRentalPackData): Promise<RentalPack> {
    const packEntity = this.packRepo.create({
      name: data.name,
      description: data.description ?? null,
      price: data.price.toString(),
    });

    const savedPack = await this.packRepo.save(packEntity);

    if (data.items?.length) {
      await this.createItems(savedPack.id, data.items);
    }

    const created = await this.findById(savedPack.id);
    if (!created) {
      throw new Error('Failed to load rental pack after creation');
    }
    return created;
  }

  async update(
    id: number,
    data: UpdateRentalPackData,
  ): Promise<RentalPack> {
    const existing = await this.packRepo.findOne({ where: { id } });
    if (!existing) {
      throw new Error(`Rental pack with id ${id} not found`);
    }

    await this.packRepo.update(id, {
      name: data.name ?? existing.name,
      description:
        data.description === undefined ? existing.description : data.description,
      price:
        data.price === undefined ? existing.price : data.price.toString(),
    });

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Failed to load rental pack after update');
    }
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.packRepo.delete(id);
  }

  async addItem(packId: number, data: CreatePackItemData): Promise<PackItem> {
    await this.ensurePackExists(packId);

    const entity = this.itemRepo.create({
      packId,
      bikeId: data.bikeId ?? null,
      accessoryId: data.accessoryId ?? null,
      quantity: data.quantity,
    });

    const saved = await this.itemRepo.save(entity);
    return this.toDomainItem(saved);
  }

  async removeItem(itemId: number): Promise<void> {
    await this.itemRepo.delete(itemId);
  }

  private async createItems(
    packId: number,
    items: CreatePackItemData[],
  ): Promise<void> {
    const entities = items.map((item) =>
      this.itemRepo.create({
        packId,
        bikeId: item.bikeId ?? null,
        accessoryId: item.accessoryId ?? null,
        quantity: item.quantity,
      }),
    );
    await this.itemRepo.save(entities);
  }

  private async ensurePackExists(id: number): Promise<void> {
    const exists = await this.packRepo.exist({ where: { id } });
    if (!exists) {
      throw new Error(`Rental pack with id ${id} not found`);
    }
  }

  private toDomainPack(entity: RentalPackEntity): RentalPack {
    const pack = new RentalPack();
    pack.id = entity.id;
    pack.name = entity.name;
    pack.description = entity.description;
    pack.price = Number(entity.price);
    pack.createdAt = entity.createdAt;
    pack.updatedAt = entity.updatedAt;
    pack.items = entity.items
      ? entity.items.map((item) => this.toDomainItem(item))
      : [];
    return pack;
  }

  private toDomainItem(entity: PackItemEntity): PackItem {
    const item = new PackItem();
    item.id = entity.id;
    item.packId = entity.packId;
    item.bikeId = entity.bikeId;
    item.accessoryId = entity.accessoryId;
    item.quantity = entity.quantity;
    return item;
  }
}
