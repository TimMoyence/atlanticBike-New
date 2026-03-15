import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsIn,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { CreateReviewUseCase } from '../application/CreateReviewUseCase';
import { DeleteReviewUseCase } from '../application/DeleteReviewUseCase';
import { GetReviewByIdUseCase } from '../application/GetReviewByIdUseCase';
import { GetReviewsByBikeUseCase } from '../application/GetReviewsByBikeUseCase';
import { GetReviewsByUserUseCase } from '../application/GetReviewsByUserUseCase';
import { ListReviewsUseCase } from '../application/ListReviewsUseCase';
import { UpdateReviewStatusUseCase } from '../application/UpdateReviewStatusUseCase';
import { UpdateReviewUseCase } from '../application/UpdateReviewUseCase';
import type {
  CreateReviewData,
  UpdateReviewData,
} from '../domain/IReviewRepository';
import type { ReviewStatus } from '../domain/Review';

const REVIEW_STATUSES: ReviewStatus[] = ['pending', 'approved', 'rejected'];

class CreateReviewDto implements CreateReviewData {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  userId: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  bikeId: number;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsOptional()
  @IsIn(REVIEW_STATUSES)
  status?: ReviewStatus;
}

class UpdateReviewDto implements UpdateReviewData {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsString()
  comment?: string;

  @IsOptional()
  @IsIn(REVIEW_STATUSES)
  status?: ReviewStatus;
}

class UpdateReviewStatusDto {
  @IsIn(REVIEW_STATUSES)
  status: ReviewStatus;
}

@Controller('reviews')
export class ReviewController {
  constructor(
    private readonly listReviews: ListReviewsUseCase,
    private readonly getReviewById: GetReviewByIdUseCase,
    private readonly getReviewsByBike: GetReviewsByBikeUseCase,
    private readonly getReviewsByUser: GetReviewsByUserUseCase,
    private readonly createReview: CreateReviewUseCase,
    private readonly updateReview: UpdateReviewUseCase,
    private readonly updateReviewStatus: UpdateReviewStatusUseCase,
    private readonly deleteReview: DeleteReviewUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listReviews.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getReviewById.execute(id);
  }

  @Get('bike/:bikeId')
  findByBike(@Param('bikeId', ParseIntPipe) bikeId: number) {
    return this.getReviewsByBike.execute(bikeId);
  }

  @Get('user/:userId')
  findByUser(@Param('userId', ParseIntPipe) userId: number) {
    return this.getReviewsByUser.execute(userId);
  }

  @Post()
  create(@Body() dto: CreateReviewDto) {
    return this.createReview.execute(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReviewDto,
  ) {
    return this.updateReview.execute(id, dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateReviewStatusDto,
  ) {
    return this.updateReviewStatus.execute(id, dto.status);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteReview.execute(id);
  }
}
