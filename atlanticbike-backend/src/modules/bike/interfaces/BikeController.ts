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
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddBikeHistoryUseCase } from '../application/AddBikeHistoryUseCase';
import { AddBikePhotoUseCase } from '../application/AddBikePhotoUseCase';
import { CreateBikeUseCase } from '../application/CreateBikeUseCase';
import { DeleteBikeUseCase } from '../application/DeleteBikeUseCase';
import { GetBikeByFrameNumberUseCase } from '../application/GetBikeByFrameNumberUseCase';
import { GetBikeByIdUseCase } from '../application/GetBikeByIdUseCase';
import { ListBikeHistoryUseCase } from '../application/ListBikeHistoryUseCase';
import { ListBikesUseCase } from '../application/ListBikesUseCase';
import { RemoveBikePhotoUseCase } from '../application/RemoveBikePhotoUseCase';
import { SetBikeMainPhotoUseCase } from '../application/SetBikeMainPhotoUseCase';
import { UpdateBikeUseCase } from '../application/UpdateBikeUseCase';
import type {
  CreateBikeData,
  CreateBikeHistoryData,
  CreateBikePhotoData,
  UpdateBikeData,
} from '../domain/IBikeRepository';
import type { BikeStatus } from '../domain/Bike';
import type { BikeHistoryType } from '../domain/BikeHistory';

class CreateBikePhotoDto implements CreateBikePhotoData {
  @IsString()
  @IsNotEmpty()
  url: string;

  @IsOptional()
  isMain?: boolean;
}

class CreateBikeHistoryDto implements CreateBikeHistoryData {
  @IsIn(['reservation', 'sale', 'repair', 'maintenance'])
  type: BikeHistoryType;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  performedBy?: number | null;
}

class CreateBikeDto implements CreateBikeData {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  frameNumber: string;

  @IsIn(['available', 'rented', 'sold', 'maintenance'])
  status: BikeStatus;

  @IsOptional()
  @IsDateString()
  purchaseDate?: Date | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  salePrice?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rentalPricePerDay?: number | null;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateBikePhotoDto)
  photos?: CreateBikePhotoDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateBikeHistoryDto)
  history?: CreateBikeHistoryDto[];
}

class UpdateBikeDto implements UpdateBikeData {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  categoryId?: number;

  @IsOptional()
  @IsString()
  frameNumber?: string;

  @IsOptional()
  @IsIn(['available', 'rented', 'sold', 'maintenance'])
  status?: BikeStatus;

  @IsOptional()
  @IsDateString()
  purchaseDate?: Date | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  salePrice?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  rentalPricePerDay?: number | null;
}

@Controller('bikes')
export class BikeController {
  constructor(
    private readonly listBikes: ListBikesUseCase,
    private readonly getBikeById: GetBikeByIdUseCase,
    private readonly getByFrame: GetBikeByFrameNumberUseCase,
    private readonly createBike: CreateBikeUseCase,
    private readonly updateBike: UpdateBikeUseCase,
    private readonly deleteBike: DeleteBikeUseCase,
    private readonly addPhoto: AddBikePhotoUseCase,
    private readonly removePhoto: RemoveBikePhotoUseCase,
    private readonly setMainPhoto: SetBikeMainPhotoUseCase,
    private readonly addHistory: AddBikeHistoryUseCase,
    private readonly listHistory: ListBikeHistoryUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listBikes.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getBikeById.execute(id);
  }

  @Get('frame/:frameNumber')
  findByFrame(@Param('frameNumber') frameNumber: string) {
    return this.getByFrame.execute(frameNumber);
  }

  @Post()
  create(@Body() dto: CreateBikeDto) {
    return this.createBike.execute(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateBikeDto,
  ) {
    return this.updateBike.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteBike.execute(id);
  }

  @Post(':id/photos')
  addBikePhoto(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateBikePhotoDto,
  ) {
    return this.addPhoto.execute(id, dto);
  }

  @Delete('photos/:photoId')
  removeBikePhoto(@Param('photoId', ParseIntPipe) photoId: number) {
    return this.removePhoto.execute(photoId);
  }

  @Patch(':id/photos/:photoId/main')
  setMainBikePhoto(
    @Param('id', ParseIntPipe) id: number,
    @Param('photoId', ParseIntPipe) photoId: number,
  ) {
    return this.setMainPhoto.execute(id, photoId);
  }

  @Get(':id/history')
  getBikeHistory(@Param('id', ParseIntPipe) id: number) {
    return this.listHistory.execute(id);
  }

  @Post(':id/history')
  addBikeHistory(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateBikeHistoryDto,
  ) {
    return this.addHistory.execute(id, dto);
  }
}
