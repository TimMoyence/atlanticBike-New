import { BikeCategory } from './BikeCategory';
import { BikeHistory } from './BikeHistory';
import { BikePhoto } from './BikePhoto';

export type BikeStatus = 'available' | 'rented' | 'sold' | 'maintenance';

export class Bike {
  id: number;
  categoryId: number;
  category?: BikeCategory;
  frameNumber: string;
  status: BikeStatus;
  purchaseDate: Date | null;
  salePrice: number | null;
  rentalPricePerDay: number | null;
  createdAt: Date;
  updatedAt: Date;
  photos?: BikePhoto[];
  history?: BikeHistory[];
}
