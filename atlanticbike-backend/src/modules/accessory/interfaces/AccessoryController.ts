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
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { AdjustAccessoryStockUseCase } from '../application/AdjustAccessoryStockUseCase';
import { CreateAccessoryUseCase } from '../application/CreateAccessoryUseCase';
import { DeleteAccessoryUseCase } from '../application/DeleteAccessoryUseCase';
import { GetAccessoryByIdUseCase } from '../application/GetAccessoryByIdUseCase';
import { ListAccessoriesUseCase } from '../application/ListAccessoriesUseCase';
import { UpdateAccessoryUseCase } from '../application/UpdateAccessoryUseCase';
import type {
  CreateAccessoryData,
  UpdateAccessoryData,
} from '../domain/IAccessoryRepository';

class CreateAccessoryDto implements CreateAccessoryData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  stockQuantity: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;
}

class UpdateAccessoryDto implements UpdateAccessoryData {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  stockQuantity?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;
}

class AdjustStockDto {
  @Type(() => Number)
  @IsInt()
  delta: number;
}

@Controller('accessories')
export class AccessoryController {
  constructor(
    private readonly listAccessories: ListAccessoriesUseCase,
    private readonly getAccessoryById: GetAccessoryByIdUseCase,
    private readonly createAccessory: CreateAccessoryUseCase,
    private readonly updateAccessory: UpdateAccessoryUseCase,
    private readonly deleteAccessory: DeleteAccessoryUseCase,
    private readonly adjustStock: AdjustAccessoryStockUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listAccessories.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getAccessoryById.execute(id);
  }

  @Post()
  create(@Body() dto: CreateAccessoryDto) {
    return this.createAccessory.execute(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateAccessoryDto,
  ) {
    return this.updateAccessory.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteAccessory.execute(id);
  }

  @Patch(':id/stock')
  adjust(@Param('id', ParseIntPipe) id: number, @Body() dto: AdjustStockDto) {
    return this.adjustStock.execute(id, dto.delta);
  }
}
