import { Part } from './Part';

export class RepairPart {
  id: number;
  repairId: number;
  partId: number;
  quantity: number;
  part?: Part;
}
