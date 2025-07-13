import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { DeliveryMethodService } from "./delivery_method.service";
import { CreateDeliveryMethodDto } from "./dto/create-delivery_method.dto";
import { UpdateDeliveryMethodDto } from "./dto/update-delivery_method.dto";

@Controller("delivery-method")
export class DeliveryMethodController {
  constructor(private readonly deliveryMethodService: DeliveryMethodService) {}

  @Post()
  async create(@Body() createDeliveryMethodDto: CreateDeliveryMethodDto) {
    return this.deliveryMethodService.create(createDeliveryMethodDto);
  }

  @Get()
  async findAll() {
    return this.deliveryMethodService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.deliveryMethodService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateDeliveryMethodDto: UpdateDeliveryMethodDto
  ) {
    return this.deliveryMethodService.update(id, updateDeliveryMethodDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.deliveryMethodService.remove(id);
  }
}
