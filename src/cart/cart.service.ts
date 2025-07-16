import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cart } from "./schemas/cart.schema";
import { CreateCartDto } from "./dto/create-cart.dto";
import { UpdateCartDto } from "./dto/update-cart.dto";

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart.name)
    private cartModel: Model<Cart>
  ) {}

  create(dto: CreateCartDto) {
    const created = new this.cartModel(dto);
    return created.save();
  }

  findAll() {
    return this.cartModel.find();
  }

  async findOne(id: string) {
    const cart = await this.cartModel.findById(id);
    if (!cart) throw new NotFoundException("Cart not found");
    return cart;
  }

  update(id: string, dto: UpdateCartDto) {
    return this.cartModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.cartModel.findByIdAndDelete(id);
  }
}
