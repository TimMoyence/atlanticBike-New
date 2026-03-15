export type ReservationStatus =
  | 'pending'
  | 'confirmed'
  | 'cancelled'
  | 'completed';

export class Reservation {
  id: number;
  userId: number;
  bikeId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  createdAt: Date;
  status: ReservationStatus;
}
