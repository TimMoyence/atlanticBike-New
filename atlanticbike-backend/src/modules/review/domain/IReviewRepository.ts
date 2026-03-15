import { Review, ReviewStatus } from './Review';

export interface CreateReviewData {
  userId: number;
  bikeId: number;
  rating: number;
  comment: string;
  status?: ReviewStatus;
}

export interface UpdateReviewData
  extends Partial<Omit<CreateReviewData, 'userId' | 'bikeId'>> {}

export interface IReviewRepository {
  findAll(): Promise<Review[]>;
  findById(id: number): Promise<Review | null>;
  findByBike(bikeId: number): Promise<Review[]>;
  findByUser(userId: number): Promise<Review[]>;
  create(data: CreateReviewData): Promise<Review>;
  update(id: number, data: UpdateReviewData): Promise<Review>;
  updateStatus(id: number, status: ReviewStatus): Promise<Review>;
  delete(id: number): Promise<void>;
}
