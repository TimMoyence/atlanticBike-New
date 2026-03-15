import { Reservation, ReservationStatus } from './Reservation';

export interface CreateReservationData {
  userId: number;
  bikeId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
  status?: ReservationStatus;
}

export interface UpdateReservationData
  extends Partial<Omit<CreateReservationData, 'userId' | 'bikeId'>> {}

export interface IReservationRepository {
  findAll(): Promise<Reservation[]>;
  findById(id: number): Promise<Reservation | null>;
  findByUser(userId: number): Promise<Reservation[]>;
  findActiveByBike(bikeId: number): Promise<Reservation[]>;
  create(data: CreateReservationData): Promise<Reservation>;
  update(id: number, data: UpdateReservationData): Promise<Reservation>;
  updateStatus(id: number, status: ReservationStatus): Promise<Reservation>;
  delete(id: number): Promise<void>;
}
