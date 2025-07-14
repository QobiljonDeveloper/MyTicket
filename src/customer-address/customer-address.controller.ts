import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { CustomerAddressService } from "./customer-address.service";
import { CreateCustomerAddressDto } from "./dto/create-customer-address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer-address.dto";

@Controller("customer-address")
export class CustomerAddressController {
  constructor(private readonly addressService: CustomerAddressService) {}

  @Post()
  create(@Body() dto: CreateCustomerAddressDto) {
    return this.addressService.create(dto);
  }

  @Get()
  findAll() {
    return this.addressService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.addressService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCustomerAddressDto) {
    return this.addressService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.addressService.remove(id);
  }
}
