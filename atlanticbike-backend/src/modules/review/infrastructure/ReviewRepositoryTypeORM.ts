import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  CreateReviewData,
  IReviewRepository,
  UpdateReviewData,
} from '../domain/IReviewRepository';
import { Review, ReviewStatus } from '../domain/Review';
import { ReviewEntity } from './entities/Review.entity';

@Injectable()
export class ReviewRepositoryTypeORM implements IReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepo: Repository<ReviewEntity>,
  ) {}

  async findAll(): Promise<Review[]> {
    const reviews = await this.reviewRepo.find({
      order: { createdAt: 'DESC' },
    });
    return reviews.map((entity) => this.toDomain(entity));
  }

  async findById(id: number): Promise<Review | null> {
    const review = await this.reviewRepo.findOne({ where: { id } });
    return review ? this.toDomain(review) : null;
  }

  async findByBike(bikeId: number): Promise<Review[]> {
    const reviews = await this.reviewRepo.find({
      where: { bikeId },
      order: { createdAt: 'DESC' },
    });
    return reviews.map((entity) => this.toDomain(entity));
  }

  async findByUser(userId: number): Promise<Review[]> {
    const reviews = await this.reviewRepo.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return reviews.map((entity) => this.toDomain(entity));
  }

  async create(data: CreateReviewData): Promise<Review> {
    const entity = this.reviewRepo.create({
      userId: data.userId,
      bikeId: data.bikeId,
      rating: data.rating,
      comment: data.comment,
      status: data.status ?? 'pending',
    });

    const saved = await this.reviewRepo.save(entity);
    return this.toDomain(saved);
  }

  async update(id: number, data: UpdateReviewData): Promise<Review> {
    const existing = await this.reviewRepo.findOne({ where: { id } });
    if (!existing) {
      throw new Error(`Review with id ${id} not found`);
    }

    await this.reviewRepo.update(id, {
      rating: data.rating ?? existing.rating,
      comment: data.comment ?? existing.comment,
      status: data.status ?? existing.status,
    });

    const updated = await this.reviewRepo.findOne({ where: { id } });
    if (!updated) {
      throw new Error('Failed to load review after update');
    }
    return this.toDomain(updated);
  }

  async updateStatus(id: number, status: ReviewStatus): Promise<Review> {
    const review = await this.reviewRepo.findOne({ where: { id } });
    if (!review) {
      throw new Error(`Review with id ${id} not found`);
    }
    review.status = status;
    const saved = await this.reviewRepo.save(review);
    return this.toDomain(saved);
  }

  async delete(id: number): Promise<void> {
    await this.reviewRepo.delete(id);
  }

  private toDomain(entity: ReviewEntity): Review {
    const review = new Review();
    review.id = entity.id;
    review.userId = entity.userId;
    review.bikeId = entity.bikeId;
    review.rating = entity.rating;
    review.comment = entity.comment;
    review.status = entity.status as ReviewStatus;
    review.createdAt = entity.createdAt;
    return review;
  }
}
