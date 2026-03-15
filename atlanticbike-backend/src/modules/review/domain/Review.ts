export type ReviewStatus = 'pending' | 'approved' | 'rejected';

export class Review {
  id: number;
  userId: number;
  bikeId: number;
  rating: number;
  comment: string;
  createdAt: Date;
  status: ReviewStatus;
}
