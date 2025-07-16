import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from "@nestjs/common";
import { CartService } from "./cart.service";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";

@Controller("carts")
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Body() dto: CreateCartDto) {
    return this.cartService.create(dto);
  }

  @Get()
  findAll() {
    return this.cartService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cartService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() dto: UpdateCartDto) {
    return this.cartService.update(id, dto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cartService.remove(id);
  }
}
