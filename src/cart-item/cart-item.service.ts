import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CartItem } from "./schemas/cart-item.schema";
import { CreateCartItemDto } from "./dto/create-cart-item.dto";
import { UpdateCartItemDto } from "./dto/update-cart-item.dto";

@Injectable()
export class CartItemService {
  constructor(
    @InjectModel(CartItem.name)
    private model: Model<CartItem>
  ) {}

  create(dto: CreateCartItemDto) {
    const created = new this.model(dto);
    return created.save();
  }

  findAll() {
    return this.model.find();
  }

  async findOne(id: string) {
    const item = await this.model.findById(id);
    if (!item) throw new NotFoundException("CartItem not found");
    return item;
  }

  update(id: string, dto: UpdateCartItemDto) {
    return this.model.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.model.findByIdAndDelete(id);
  }
}
