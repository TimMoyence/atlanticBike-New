import { Repair, RepairStatus } from './Repair';
import { RepairPart } from './RepairPart';
import { Part } from './Part';

export interface CreateRepairPartData {
  partId: number;
  quantity: number;
}

export interface CreateRepairData {
  bikeId: number;
  mechanicId?: number | null;
  description: string;
  repairDate: Date;
  cost: number;
  status: RepairStatus;
  parts?: CreateRepairPartData[];
}

export interface UpdateRepairData
  extends Partial<Omit<CreateRepairData, 'parts'>> {}

export interface IRepairRepository {
  findAll(): Promise<Repair[]>;
  findById(id: number): Promise<Repair | null>;
  create(data: CreateRepairData): Promise<Repair>;
  update(id: number, data: UpdateRepairData): Promise<Repair>;
  delete(id: number): Promise<void>;
  listParts(): Promise<Part[]>;
  addPartToRepair(
    repairId: number,
    data: CreateRepairPartData,
  ): Promise<RepairPart>;
  removePartFromRepair(repairPartId: number): Promise<void>;
}
