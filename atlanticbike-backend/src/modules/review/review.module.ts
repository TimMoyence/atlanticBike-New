import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateReviewUseCase } from './application/CreateReviewUseCase';
import { DeleteReviewUseCase } from './application/DeleteReviewUseCase';
import { GetReviewByIdUseCase } from './application/GetReviewByIdUseCase';
import { GetReviewsByBikeUseCase } from './application/GetReviewsByBikeUseCase';
import { GetReviewsByUserUseCase } from './application/GetReviewsByUserUseCase';
import { ListReviewsUseCase } from './application/ListReviewsUseCase';
import { UpdateReviewStatusUseCase } from './application/UpdateReviewStatusUseCase';
import { UpdateReviewUseCase } from './application/UpdateReviewUseCase';
import { REVIEW_REPOSITORY } from './domain/tokens';
import { ReviewController } from './interfaces/ReviewController';
import { ReviewRepositoryTypeORM } from './infrastructure/ReviewRepositoryTypeORM';
import { ReviewEntity } from './infrastructure/entities/Review.entity';

const REVIEW_USE_CASES = [
  ListReviewsUseCase,
  GetReviewByIdUseCase,
  GetReviewsByBikeUseCase,
  GetReviewsByUserUseCase,
  CreateReviewUseCase,
  UpdateReviewUseCase,
  UpdateReviewStatusUseCase,
  DeleteReviewUseCase,
];

@Module({
  imports: [TypeOrmModule.forFeature([ReviewEntity])],
  controllers: [ReviewController],
  providers: [
    {
      provide: REVIEW_REPOSITORY,
      useClass: ReviewRepositoryTypeORM,
    },
    ...REVIEW_USE_CASES,
  ],
  exports: [REVIEW_REPOSITORY],
})
export class ReviewModule {}
