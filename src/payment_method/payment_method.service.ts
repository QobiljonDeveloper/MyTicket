import { Injectable } from '@nestjs/common';
import { CreatePaymentMethodDto } from './dto/create-payment_method.dto';
import { UpdatePaymentMethodDto } from './dto/update-payment_method.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentMethod } from './schemas/payment_method.schemas';

@Injectable()
export class PaymentMethodService {
  constructor(
    @InjectModel(PaymentMethod.name)
    private readonly paymentMethodSchema: Model<PaymentMethod>,
  ) {}
 async create(createPaymentMethodDto: CreatePaymentMethodDto) {
    const candidate = await this.paymentMethodSchema.findOne({
      name: createPaymentMethodDto.name,
    });

    if (!candidate) {
      throw new Error('Bunday paymentMethod allaqachon mavjud');
    }

    return this.paymentMethodSchema.create(createPaymentMethodDto);
  }

 async findAll() {
    return this.paymentMethodSchema.find();
  }

 async findOne(id: string) {
    return this.paymentMethodSchema.findById(id);
  }

 async update(id: string, updatePaymentMethodDto: UpdatePaymentMethodDto) {
    return this.paymentMethodSchema.findByIdAndUpdate(id, updatePaymentMethodDto, {
      new: true,
    });
  }

 async remove(id: string) {
    return this.paymentMethodSchema.findByIdAndDelete(id);
  }
}
