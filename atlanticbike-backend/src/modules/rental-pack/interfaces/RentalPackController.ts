import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddPackItemUseCase } from '../application/AddPackItemUseCase';
import { CreateRentalPackUseCase } from '../application/CreateRentalPackUseCase';
import { DeleteRentalPackUseCase } from '../application/DeleteRentalPackUseCase';
import { GetRentalPackByIdUseCase } from '../application/GetRentalPackByIdUseCase';
import { ListRentalPacksUseCase } from '../application/ListRentalPacksUseCase';
import { RemovePackItemUseCase } from '../application/RemovePackItemUseCase';
import { UpdateRentalPackUseCase } from '../application/UpdateRentalPackUseCase';
import type {
  CreatePackItemData,
  CreateRentalPackData,
  UpdateRentalPackData,
} from '../domain/IRentalPackRepository';

class CreatePackItemDto implements CreatePackItemData {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  bikeId?: number | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  accessoryId?: number | null;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  quantity: number;
}

class CreateRentalPackDto implements CreateRentalPackData {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreatePackItemDto)
  items?: CreatePackItemDto[];
}

class UpdateRentalPackDto implements UpdateRentalPackData {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string | null;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price?: number;
}

@Controller('rental-packs')
export class RentalPackController {
  constructor(
    private readonly listPacks: ListRentalPacksUseCase,
    private readonly getPackById: GetRentalPackByIdUseCase,
    private readonly createPack: CreateRentalPackUseCase,
    private readonly updatePack: UpdateRentalPackUseCase,
    private readonly deletePack: DeleteRentalPackUseCase,
    private readonly addPackItem: AddPackItemUseCase,
    private readonly removePackItem: RemovePackItemUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listPacks.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getPackById.execute(id);
  }

  @Post()
  create(@Body() dto: CreateRentalPackDto) {
    return this.createPack.execute(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRentalPackDto,
  ) {
    return this.updatePack.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deletePack.execute(id);
  }

  @Post(':id/items')
  addItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePackItemDto,
  ) {
    return this.addPackItem.execute(id, dto);
  }

  @Delete('items/:itemId')
  removeItem(@Param('itemId', ParseIntPipe) itemId: number) {
    return this.removePackItem.execute(itemId);
  }
}
