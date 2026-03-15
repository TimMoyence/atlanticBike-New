import { Bike } from './Bike';
import { BikePhoto } from './BikePhoto';
import { BikeHistory, BikeHistoryType } from './BikeHistory';

export interface CreateBikePhotoData {
  url: string;
  isMain?: boolean;
}

export interface CreateBikeHistoryData {
  type: BikeHistoryType;
  description: string;
  performedBy?: number | null;
}

export interface CreateBikeData {
  categoryId: number;
  frameNumber: string;
  status: Bike['status'];
  purchaseDate?: Date | null;
  salePrice?: number | null;
  rentalPricePerDay?: number | null;
  photos?: CreateBikePhotoData[];
  history?: CreateBikeHistoryData[];
}

export interface UpdateBikeData
  extends Partial<Omit<CreateBikeData, 'photos' | 'history'>> {}

export interface IBikeRepository {
  findAll(): Promise<Bike[]>;
  findById(id: number): Promise<Bike | null>;
  findByFrameNumber(frameNumber: string): Promise<Bike | null>;
  create(data: CreateBikeData): Promise<Bike>;
  update(id: number, data: UpdateBikeData): Promise<Bike>;
  delete(id: number): Promise<void>;
  addPhoto(bikeId: number, data: CreateBikePhotoData): Promise<BikePhoto>;
  removePhoto(photoId: number): Promise<void>;
  setMainPhoto(bikeId: number, photoId: number): Promise<void>;
  addHistory(bikeId: number, data: CreateBikeHistoryData): Promise<BikeHistory>;
  listHistory(bikeId: number): Promise<BikeHistory[]>;
}
