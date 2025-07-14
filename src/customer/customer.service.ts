import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";
import { Customer, CustomerDocument } from "./schemas/customer.schema";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Customer.name) private customerModel: Model<CustomerDocument>
  ) {}

  async create(createDto: CreateCustomerDto) {
    const hashed_password = await bcrypt.hash(createDto.password, 7);
    const customer = new this.customerModel({
      ...createDto,
      hashed_password,
    });
    return customer.save();
  }

  findAll() {
    return this.customerModel.find();
  }

  async findOne(id: string) {
    const customer = await this.customerModel.findById(id);
    if (!customer) throw new NotFoundException("Customer topilmadi");
    return customer;
  }

  update(id: string, updateDto: UpdateCustomerDto) {
    return this.customerModel.findByIdAndUpdate(id, updateDto, { new: true });
  }

  remove(id: string) {
    return this.customerModel.findByIdAndDelete(id);
  }

  findByEmail(email: string) {
    return this.customerModel.findOne({ email });
  }

  async findById(id: string) {
    return this.customerModel.findById(id);
  }
}
