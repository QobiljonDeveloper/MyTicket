import { Injectable } from "@nestjs/common";
import { CreateDeliveryMethodDto } from "./dto/create-delivery_method.dto";
import { UpdateDeliveryMethodDto } from "./dto/update-delivery_method.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { DeliveryMethod } from "./schemas/delivery_method.schemas";

@Injectable()
export class DeliveryMethodService {
  constructor(
    @InjectModel(DeliveryMethod.name)
    private readonly deliveryMethodSchema: Model<DeliveryMethod>,
  ) {}
  create(createDeliveryMethodDto: CreateDeliveryMethodDto) {
    const candidate = this.deliveryMethodSchema.findOne({
      name: createDeliveryMethodDto.name,
    });

    if (!candidate) {
      throw new Error("Bunday deliveryMethod allaqachon mavjud");
    }

    return this.deliveryMethodSchema.create(createDeliveryMethodDto);
  }

  findAll() {
    return this.deliveryMethodSchema.find();
  }

  findOne(id: string) {
    return this.deliveryMethodSchema.findById(id);
  }

  update(id: string, updateDeliveryMethodDto: UpdateDeliveryMethodDto) {
    return this.deliveryMethodSchema.findByIdAndUpdate(id, updateDeliveryMethodDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.deliveryMethodSchema.findByIdAndDelete(id);
  }
}
