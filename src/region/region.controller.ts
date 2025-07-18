import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { RegionService } from "./region.service";
import { CreateRegionDto } from "./dto/create-region.dto";
import { UpdateRegionDto } from "./dto/update-region.dto";

@Controller("region")
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @Post()
  async create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @Get()
  async findAll() {
    return this.regionService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.regionService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateRegionDto: UpdateRegionDto
  ) {
    return this.regionService.update(id, updateRegionDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.regionService.remove(id);
  }
}
