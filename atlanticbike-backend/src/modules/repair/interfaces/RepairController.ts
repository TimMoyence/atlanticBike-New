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
  IsDateString,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  ValidateNested,
} from 'class-validator';
import { AddPartToRepairUseCase } from '../application/AddPartToRepairUseCase';
import { CreateRepairUseCase } from '../application/CreateRepairUseCase';
import { DeleteRepairUseCase } from '../application/DeleteRepairUseCase';
import { GetRepairByIdUseCase } from '../application/GetRepairByIdUseCase';
import { ListPartsUseCase } from '../application/ListPartsUseCase';
import { ListRepairsUseCase } from '../application/ListRepairsUseCase';
import { RemovePartFromRepairUseCase } from '../application/RemovePartFromRepairUseCase';
import { UpdateRepairUseCase } from '../application/UpdateRepairUseCase';
import type {
  CreateRepairData,
  CreateRepairPartData,
  UpdateRepairData,
} from '../domain/IRepairRepository';
import type { RepairStatus } from '../domain/Repair';

const REPAIR_STATUSES: RepairStatus[] = ['pending', 'in_progress', 'done'];

class CreateRepairPartDto implements CreateRepairPartData {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  partId: number;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  quantity: number;
}

class CreateRepairDto implements CreateRepairData {
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  bikeId: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  mechanicId?: number | null;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  repairDate: Date;

  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  cost: number;

  @IsIn(REPAIR_STATUSES)
  status: RepairStatus;

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateRepairPartDto)
  parts?: CreateRepairPartDto[];
}

class UpdateRepairDto implements UpdateRepairData {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  bikeId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  mechanicId?: number | null;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  repairDate?: Date;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  cost?: number;

  @IsOptional()
  @IsIn(REPAIR_STATUSES)
  status?: RepairStatus;
}

@Controller('repairs')
export class RepairController {
  constructor(
    private readonly listRepairs: ListRepairsUseCase,
    private readonly getRepairById: GetRepairByIdUseCase,
    private readonly listParts: ListPartsUseCase,
    private readonly createRepair: CreateRepairUseCase,
    private readonly updateRepair: UpdateRepairUseCase,
    private readonly deleteRepair: DeleteRepairUseCase,
    private readonly addPartToRepair: AddPartToRepairUseCase,
    private readonly removePartFromRepair: RemovePartFromRepairUseCase,
  ) {}

  @Get()
  findAll() {
    return this.listRepairs.execute();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.getRepairById.execute(id);
  }

  @Get('parts')
  findParts() {
    return this.listParts.execute();
  }

  @Post()
  create(@Body() dto: CreateRepairDto) {
    return this.createRepair.execute(dto);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateRepairDto,
  ) {
    return this.updateRepair.execute(id, dto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.deleteRepair.execute(id);
  }

  @Post(':id/parts')
  addPart(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreateRepairPartDto,
  ) {
    return this.addPartToRepair.execute(id, dto);
  }

  @Delete('parts/:repairPartId')
  removePart(@Param('repairPartId', ParseIntPipe) repairPartId: number) {
    return this.removePartFromRepair.execute(repairPartId);
  }
}
