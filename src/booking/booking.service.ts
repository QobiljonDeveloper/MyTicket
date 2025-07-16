import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Booking } from "./schemas/booking.schema";
import { CreateBookingDto } from "./dto/create-booking.dto";
import { UpdateBookingDto } from "./dto/update-booking.dto";

@Injectable()
export class BookingService {
  constructor(
    @InjectModel(Booking.name) private bookingModel: Model<Booking>
  ) {}

  create(dto: CreateBookingDto) {
    const booking = new this.bookingModel(dto);
    return booking.save();
  }

  findAll() {
    return this.bookingModel.find();
  }

  async findOne(id: string) {
    const booking = await this.bookingModel.findById(id);
    if (!booking) throw new NotFoundException("Booking not found");
    return booking;
  }

  update(id: string, dto: UpdateBookingDto) {
    return this.bookingModel.findByIdAndUpdate(id, dto, { new: true });
  }

  remove(id: string) {
    return this.bookingModel.findByIdAndDelete(id);
  }
}
