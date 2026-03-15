import { RepairPart } from './RepairPart';

export type RepairStatus = 'pending' | 'in_progress' | 'done';

export class Repair {
  id: number;
  bikeId: number;
  mechanicId: number | null;
  description: string;
  repairDate: Date;
  cost: number;
  status: RepairStatus;
  parts?: RepairPart[];
}
