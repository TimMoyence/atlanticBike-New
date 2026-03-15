import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateRepairData,
  CreateRepairPartData,
  IRepairRepository,
  UpdateRepairData,
} from '../domain/IRepairRepository';
import { Repair, RepairStatus } from '../domain/Repair';
import { RepairPart } from '../domain/RepairPart';
import { Part } from '../domain/Part';
import { RepairEntity } from './entities/Repair.entity';
import { RepairPartEntity } from './entities/RepairPart.entity';
import { PartEntity } from './entities/Part.entity';

@Injectable()
export class RepairRepositoryTypeORM implements IRepairRepository {
  constructor(
    @InjectRepository(RepairEntity)
    private readonly repairRepo: Repository<RepairEntity>,
    @InjectRepository(RepairPartEntity)
    private readonly repairPartRepo: Repository<RepairPartEntity>,
    @InjectRepository(PartEntity)
    private readonly partRepo: Repository<PartEntity>,
  ) {}

  async findAll(): Promise<Repair[]> {
    const repairs = await this.repairRepo.find({
      relations: ['parts', 'parts.part'],
      order: { repairDate: 'DESC' },
    });
    return repairs.map((entity) => this.toDomainRepair(entity));
  }

  async findById(id: number): Promise<Repair | null> {
    const repair = await this.repairRepo.findOne({
      where: { id },
      relations: ['parts', 'parts.part'],
    });
    return repair ? this.toDomainRepair(repair) : null;
  }

  async create(data: CreateRepairData): Promise<Repair> {
    const repairEntity = this.repairRepo.create({
      bikeId: data.bikeId,
      mechanicId: data.mechanicId ?? null,
      description: data.description,
      repairDate: data.repairDate,
      cost: data.cost.toString(),
      status: data.status,
    });

    const savedRepair = await this.repairRepo.save(repairEntity);

    if (data.parts?.length) {
      await this.createRepairParts(savedRepair.id, data.parts);
    }

    const created = await this.findById(savedRepair.id);
    if (!created) {
      throw new Error('Failed to load repair after creation');
    }
    return created;
  }

  async update(id: number, data: UpdateRepairData): Promise<Repair> {
    const existing = await this.repairRepo.findOne({ where: { id } });
    if (!existing) {
      throw new Error(`Repair with id ${id} not found`);
    }

    await this.repairRepo.update(id, {
      bikeId: data.bikeId ?? existing.bikeId,
      mechanicId:
        data.mechanicId === undefined ? existing.mechanicId : data.mechanicId ?? null,
      description: data.description ?? existing.description,
      repairDate: data.repairDate ?? existing.repairDate,
      cost:
        data.cost === undefined ? existing.cost : data.cost.toString(),
      status: data.status ?? existing.status,
    });

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Failed to load repair after update');
    }
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.repairRepo.delete(id);
  }

  async listParts(): Promise<Part[]> {
    const parts = await this.partRepo.find({
      order: { name: 'ASC' },
    });
    return parts.map((entity) => this.toDomainPart(entity));
  }

  async addPartToRepair(
    repairId: number,
    data: CreateRepairPartData,
  ): Promise<RepairPart> {
    await this.ensureRepairExists(repairId);
    await this.ensurePartExists(data.partId);

    const entity = this.repairPartRepo.create({
      repairId,
      partId: data.partId,
      quantity: data.quantity,
    });

    const saved = await this.repairPartRepo.save(entity);

    const withPart = await this.repairPartRepo.findOne({
      where: { id: saved.id },
      relations: ['part'],
    });
    if (!withPart) {
      throw new Error('Failed to load repair part after creation');
    }

    return this.toDomainRepairPart(withPart);
  }

  async removePartFromRepair(repairPartId: number): Promise<void> {
    await this.repairPartRepo.delete(repairPartId);
  }

  private async createRepairParts(
    repairId: number,
    parts: CreateRepairPartData[],
  ): Promise<void> {
    const entities = parts.map((part) =>
      this.repairPartRepo.create({
        repairId,
        partId: part.partId,
        quantity: part.quantity,
      }),
    );
    await this.repairPartRepo.save(entities);
  }

  private async ensureRepairExists(id: number): Promise<void> {
    const exists = await this.repairRepo.exist({ where: { id } });
    if (!exists) {
      throw new Error(`Repair with id ${id} not found`);
    }
  }

  private async ensurePartExists(id: number): Promise<void> {
    const exists = await this.partRepo.exist({ where: { id } });
    if (!exists) {
      throw new Error(`Part with id ${id} not found`);
    }
  }

  private toDomainRepair(entity: RepairEntity): Repair {
    const repair = new Repair();
    repair.id = entity.id;
    repair.bikeId = entity.bikeId;
    repair.mechanicId = entity.mechanicId;
    repair.description = entity.description;
    repair.repairDate = entity.repairDate;
    repair.cost = Number(entity.cost);
    repair.status = entity.status as RepairStatus;
    repair.parts = entity.parts
      ? entity.parts.map((part) => this.toDomainRepairPart(part))
      : [];
    return repair;
  }

  private toDomainRepairPart(entity: RepairPartEntity): RepairPart {
    const repairPart = new RepairPart();
    repairPart.id = entity.id;
    repairPart.repairId = entity.repairId;
    repairPart.partId = entity.partId;
    repairPart.quantity = entity.quantity;
    repairPart.part = entity.part ? this.toDomainPart(entity.part) : undefined;
    return repairPart;
  }

  private toDomainPart(entity: PartEntity): Part {
    const part = new Part();
    part.id = entity.id;
    part.name = entity.name;
    part.description = entity.description;
    part.stockQuantity = entity.stockQuantity;
    part.price = Number(entity.price);
    part.createdAt = entity.createdAt;
    part.updatedAt = entity.updatedAt;
    return part;
  }
}
