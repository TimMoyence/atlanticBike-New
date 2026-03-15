import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateBikeData,
  CreateBikeHistoryData,
  CreateBikePhotoData,
  IBikeRepository,
  UpdateBikeData,
} from '../domain/IBikeRepository';
import { Bike } from '../domain/Bike';
import { BikePhoto } from '../domain/BikePhoto';
import { BikeHistory, BikeHistoryType } from '../domain/BikeHistory';
import { BikeEntity } from './entities/Bike.entity';
import { BikePhotoEntity } from './entities/BikePhoto.entity';
import { BikeHistoryEntity } from './entities/BikeHistory.entity';
import { BikeCategoryEntity } from './entities/BikeCategory.entity';

@Injectable()
export class BikeRepositoryTypeORM implements IBikeRepository {
  constructor(
    @InjectRepository(BikeEntity)
    private readonly bikeRepo: Repository<BikeEntity>,
    @InjectRepository(BikePhotoEntity)
    private readonly photoRepo: Repository<BikePhotoEntity>,
    @InjectRepository(BikeHistoryEntity)
    private readonly historyRepo: Repository<BikeHistoryEntity>,
    @InjectRepository(BikeCategoryEntity)
    private readonly categoryRepo: Repository<BikeCategoryEntity>,
  ) {}

  async findAll(): Promise<Bike[]> {
    const bikes = await this.bikeRepo.find({
      relations: ['category', 'photos', 'history'],
      order: { id: 'ASC' },
    });
    return bikes.map((entity) => this.toDomainBike(entity));
  }

  async findById(id: number): Promise<Bike | null> {
    const bike = await this.bikeRepo.findOne({
      where: { id },
      relations: ['category', 'photos', 'history'],
    });
    return bike ? this.toDomainBike(bike) : null;
  }

  async findByFrameNumber(frameNumber: string): Promise<Bike | null> {
    const bike = await this.bikeRepo.findOne({
      where: { frameNumber },
      relations: ['category', 'photos', 'history'],
    });
    return bike ? this.toDomainBike(bike) : null;
  }

  async create(data: CreateBikeData): Promise<Bike> {
    await this.ensureCategoryExists(data.categoryId);

    const bikeEntity = this.bikeRepo.create({
      categoryId: data.categoryId,
      frameNumber: data.frameNumber,
      status: data.status,
      purchaseDate: data.purchaseDate ?? null,
      salePrice: this.decimalToString(data.salePrice),
      rentalPricePerDay: this.decimalToString(data.rentalPricePerDay),
    });

    const savedBike = await this.bikeRepo.save(bikeEntity);

    if (data.photos?.length) {
      await this.createPhotos(savedBike.id, data.photos);
    }

    if (data.history?.length) {
      await this.createHistory(savedBike.id, data.history);
    }

    const created = await this.findById(savedBike.id);
    if (!created) {
      throw new Error('Failed to load bike after creation');
    }
    return created;
  }

  async update(id: number, data: UpdateBikeData): Promise<Bike> {
    const existing = await this.bikeRepo.findOne({ where: { id } });
    if (!existing) {
      throw new Error(`Bike with id ${id} not found`);
    }

    if (data.categoryId !== undefined) {
      await this.ensureCategoryExists(data.categoryId);
    }

    await this.bikeRepo.update(id, {
      categoryId: data.categoryId ?? existing.categoryId,
      frameNumber: data.frameNumber ?? existing.frameNumber,
      status: data.status ?? existing.status,
      purchaseDate:
        data.purchaseDate === undefined ? existing.purchaseDate : data.purchaseDate,
      salePrice:
        data.salePrice === undefined
          ? existing.salePrice
          : this.decimalToString(data.salePrice),
      rentalPricePerDay:
        data.rentalPricePerDay === undefined
          ? existing.rentalPricePerDay
          : this.decimalToString(data.rentalPricePerDay),
    });

    const updated = await this.findById(id);
    if (!updated) {
      throw new Error('Failed to load bike after update');
    }
    return updated;
  }

  async delete(id: number): Promise<void> {
    await this.bikeRepo.delete(id);
  }

  async addPhoto(bikeId: number, data: CreateBikePhotoData): Promise<BikePhoto> {
    await this.ensureBikeExists(bikeId);

    const entity = this.photoRepo.create({
      bikeId,
      url: data.url,
      isMain: data.isMain ?? false,
    });

    const saved = await this.photoRepo.save(entity);

    if (saved.isMain) {
      await this.ensureSingleMainPhoto(bikeId, saved.id);
    }

    return this.toDomainPhoto(saved);
  }

  async removePhoto(photoId: number): Promise<void> {
    await this.photoRepo.delete(photoId);
  }

  async setMainPhoto(bikeId: number, photoId: number): Promise<void> {
    const photo = await this.photoRepo.findOne({
      where: { id: photoId, bikeId },
    });
    if (!photo) {
      throw new Error(`Photo ${photoId} not found for bike ${bikeId}`);
    }

    await this.photoRepo.update(photoId, { isMain: true });
    await this.ensureSingleMainPhoto(bikeId, photoId);
  }

  async addHistory(
    bikeId: number,
    data: CreateBikeHistoryData,
  ): Promise<BikeHistory> {
    await this.ensureBikeExists(bikeId);

    const entity = this.historyRepo.create({
      bikeId,
      type: data.type,
      description: data.description,
      performedBy: data.performedBy ?? null,
    });

    const saved = await this.historyRepo.save(entity);
    return this.toDomainHistory(saved);
  }

  async listHistory(bikeId: number): Promise<BikeHistory[]> {
    const entries = await this.historyRepo.find({
      where: { bikeId },
      order: { createdAt: 'DESC' },
    });
    return entries.map((entry) => this.toDomainHistory(entry));
  }

  private async ensureCategoryExists(categoryId: number): Promise<void> {
    const exists = await this.categoryRepo.exist({ where: { id: categoryId } });
    if (!exists) {
      throw new Error(`Bike category ${categoryId} not found`);
    }
  }

  private async ensureBikeExists(id: number): Promise<void> {
    const exists = await this.bikeRepo.exist({ where: { id } });
    if (!exists) {
      throw new Error(`Bike with id ${id} not found`);
    }
  }

  private async createPhotos(
    bikeId: number,
    photos: CreateBikePhotoData[],
  ): Promise<void> {
    const entities = photos.map((photo, index) =>
      this.photoRepo.create({
        bikeId,
        url: photo.url,
        isMain: photo.isMain ?? index === 0,
      }),
    );
    const saved = await this.photoRepo.save(entities);
    const mainPhoto = saved.find((photo) => photo.isMain);
    if (mainPhoto) {
      await this.ensureSingleMainPhoto(bikeId, mainPhoto.id);
    }
  }

  private async createHistory(
    bikeId: number,
    history: CreateBikeHistoryData[],
  ): Promise<void> {
    const entities = history.map((entry) =>
      this.historyRepo.create({
        bikeId,
        type: entry.type,
        description: entry.description,
        performedBy: entry.performedBy ?? null,
      }),
    );
    await this.historyRepo.save(entities);
  }

  private async ensureSingleMainPhoto(
    bikeId: number,
    mainPhotoId: number,
  ): Promise<void> {
    await this.photoRepo
      .createQueryBuilder()
      .update()
      .set({ isMain: false })
      .where('bike_id = :bikeId AND id <> :photoId', {
        bikeId,
        photoId: mainPhotoId,
      })
      .execute();
  }

  private toDomainBike(entity: BikeEntity): Bike {
    const bike = new Bike();
    bike.id = entity.id;
    bike.categoryId = entity.categoryId;
    bike.category = entity.category
      ? {
          id: entity.category.id,
          name: entity.category.name,
          description: entity.category.description,
          createdAt: entity.category.createdAt,
        }
      : undefined;
    bike.frameNumber = entity.frameNumber;
    bike.status = entity.status as Bike['status'];
    bike.purchaseDate = entity.purchaseDate ?? null;
    bike.salePrice = this.stringToNumber(entity.salePrice);
    bike.rentalPricePerDay = this.stringToNumber(entity.rentalPricePerDay);
    bike.createdAt = entity.createdAt;
    bike.updatedAt = entity.updatedAt;
    bike.photos = entity.photos
      ? entity.photos.map((photo) => this.toDomainPhoto(photo))
      : [];
    bike.history = entity.history
      ? entity.history.map((history) => this.toDomainHistory(history))
      : [];
    return bike;
  }

  private toDomainPhoto(entity: BikePhotoEntity): BikePhoto {
    const photo = new BikePhoto();
    photo.id = entity.id;
    photo.bikeId = entity.bikeId;
    photo.url = entity.url;
    photo.isMain = entity.isMain;
    return photo;
  }

  private toDomainHistory(entity: BikeHistoryEntity): BikeHistory {
    const history = new BikeHistory();
    history.id = entity.id;
    history.bikeId = entity.bikeId;
    history.type = entity.type as BikeHistoryType;
    history.description = entity.description;
    history.performedBy = entity.performedBy;
    history.createdAt = entity.createdAt;
    return history;
  }

  private decimalToString(value: number | null | undefined): string | null {
    if (value === undefined || value === null) {
      return null;
    }
    return value.toString();
  }

  private stringToNumber(value: string | null | undefined): number | null {
    if (value === undefined || value === null) {
      return null;
    }
    const parsed = Number(value);
    return Number.isNaN(parsed) ? null : parsed;
  }
}
