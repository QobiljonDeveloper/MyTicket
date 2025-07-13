import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { PaymentMethodService } from "./payment_method.service";
import { CreatePaymentMethodDto } from "./dto/create-payment_method.dto";
import { UpdatePaymentMethodDto } from "./dto/update-payment_method.dto";

@Controller("payment-method")
export class PaymentMethodController {
  constructor(private readonly paymentMethodService: PaymentMethodService) {}

  @Post()
  async create(@Body() createPaymentMethodDto: CreatePaymentMethodDto) {
    return this.paymentMethodService.create(createPaymentMethodDto);
  }

  @Get()
  async findAll() {
    return this.paymentMethodService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    return this.paymentMethodService.findOne(id);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updatePaymentMethodDto: UpdatePaymentMethodDto
  ) {
    return this.paymentMethodService.update(id, updatePaymentMethodDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string) {
    return this.paymentMethodService.remove(id);
  }
}
