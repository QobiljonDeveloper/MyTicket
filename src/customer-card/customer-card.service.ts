import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { CreateCustomerCardDto } from "./dto/create-customer-card.dto";
import { UpdateCustomerCardDto } from "./dto/update-customer-card.dto";
import {
  CustomerCard,
  CustomerCardDocument,
} from "./schemas/customer-card.schema";

@Injectable()
export class CustomerCardService {
  constructor(
    @InjectModel(CustomerCard.name)
    private readonly cardModel: Model<CustomerCardDocument>
  ) {}

  create(dto: CreateCustomerCardDto) {
    const card = new this.cardModel(dto);
    return card.save();
  }

  findAll() {
    return this.cardModel.find().populate("customer_id");
  }

  async findOne(id: string) {
    const card = await this.cardModel.findById(id).populate("customer_id");
    if (!card) throw new NotFoundException("Karta topilmadi");
    return card;
  }

  update(id: string, dto: UpdateCustomerCardDto) {
    return this.cardModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.cardModel.findByIdAndDelete(id);
  }

  findByCustomer(customerId: string) {
    return this.cardModel.find({ customer_id: customerId });
  }
}
