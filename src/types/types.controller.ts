import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { TypesService } from "./types.service";
import { CreateTypeDto } from "./dto/create-type.dto";
import { UpdateTypeDto } from "./dto/update-type.dto";

@Controller("types")
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post()
  async create(@Body() createTypeDto: CreateTypeDto) {
    return this.typesService.create(createTypeDto);
  }

  @Get()
  async findAll() {
    return this.typesService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.typesService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateTypeDto: UpdateTypeDto) {
    return this.typesService.update(id, updateTypeDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.typesService.remove(id);
  }
}
