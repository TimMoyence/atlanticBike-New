export type BikeHistoryType = 'reservation' | 'sale' | 'repair' | 'maintenance';

export class BikeHistory {
  id: number;
  bikeId: number;
  type: BikeHistoryType;
  description: string;
  createdAt: Date;
  performedBy: number | null;
}
