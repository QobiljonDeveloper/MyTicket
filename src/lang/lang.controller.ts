import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { LangService } from "./lang.service";
import { CreateLangDto } from "./dto/create-lang.dto";
import { UpdateLangDto } from "./dto/update-lang.dto";

@Controller("lang")
export class LangController {
  constructor(private readonly langService: LangService) {}

  @Post()
  async create(@Body() createLangDto: CreateLangDto) {
    return this.langService.create(createLangDto);
  }

  @Get()
  async findAll() {
    return this.langService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.langService.findOne(id);
  }

  @Patch(":id")
  async update(@Param("id") id: string, @Body() updateLangDto: UpdateLangDto) {
    return this.langService.update(id, updateLangDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.langService.remove(id);
  }
}
