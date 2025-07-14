import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Seat, SeatDocument } from "./schemas/seat.schema";
import { CreateSeatDto } from "./dto/create-seat.dto";
import { UpdateSeatDto } from "./dto/update-seat.dto";

@Injectable()
export class SeatService {
  constructor(@InjectModel(Seat.name) private seatModel: Model<SeatDocument>) {}

  async create(dto: CreateSeatDto) {
    return this.seatModel.create(dto);
  }

  async findAll() {
    return this.seatModel.find().populate("venue_id").populate("seat_type_id");
  }

  async findOne(id: string) {
    const seat = await this.seatModel
      .findById(id)
      .populate("venue_id")
      .populate("seat_type_id");

    if (!seat) throw new NotFoundException("Joy topilmadi");
    return seat;
  }

  async update(id: string, dto: UpdateSeatDto) {
    const updated = await this.seatModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException("Joy topilmadi");
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.seatModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException("Joy topilmadi");
    return { message: "Joy o‘chirildi" };
  }
}
