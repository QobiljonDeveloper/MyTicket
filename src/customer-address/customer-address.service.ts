import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
  CustomerAddress,
  CustomerAddressDocument,
} from "./schemas/customer-address.schema";
import { Model } from "mongoose";
import { CreateCustomerAddressDto } from "./dto/create-customer-address.dto";
import { UpdateCustomerAddressDto } from "./dto/update-customer-address.dto";

@Injectable()
export class CustomerAddressService {
  constructor(
    @InjectModel(CustomerAddress.name)
    private addressModel: Model<CustomerAddressDocument>
  ) {}

  async create(dto: CreateCustomerAddressDto) {
    return this.addressModel.create(dto);
  }

  async findAll() {
    return this.addressModel.find().populate("customer_id");
  }

  async findOne(id: string) {
    const found = await this.addressModel.findById(id).populate("customer_id");
    if (!found) throw new NotFoundException("Manzil topilmadi");
    return found;
  }

  async update(id: string, dto: UpdateCustomerAddressDto) {
    const updated = await this.addressModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException("Yangilashda xatolik");
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.addressModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException("O‘chirishda xatolik");
    return { message: "O‘chirildi" };
  }
}
