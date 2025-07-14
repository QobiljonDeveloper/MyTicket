import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { SeatService } from "./seat.service";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";

@Controller("seat")
export class SeatController {
  constructor(private readonly seatService: SeatService) {}

  @Post()
  create(@Body() dto: CreateSeatDto) {
    return this.seatService.create(dto);
  }

  @Get()
  findAll() {
    return this.seatService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.seatService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateSeatDto) {
    return this.seatService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.seatService.remove(id);
  }
}
