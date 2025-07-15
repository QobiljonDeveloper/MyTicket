// ticket.service.ts
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Ticket, TicketDocument } from "./schemas/ticket.schema";
import { Model } from "mongoose";
import { CreateTicketDto } from "./dto/create-ticket.dto";
import { UpdateTicketDto } from "./dto/update-ticket.dto";

@Injectable()
export class TicketService {
  constructor(
    @InjectModel(Ticket.name)
    private readonly ticketModel: Model<TicketDocument>
  ) {}

  async create(dto: CreateTicketDto) {
    return this.ticketModel.create(dto);
  }

  async findAll() {
    return this.ticketModel
      .find()
      .populate("event_id", "name")
      .populate("seat_id", "number row_number")
      .populate("status_id", "name")
      .exec();
  }

  async findOne(id: string) {
    const ticket = await this.ticketModel
      .findById(id)
      .populate("event_id", "name")
      .populate("seat_id", "number row_number")
      .populate("status_id", "name")
      .exec();
    if (!ticket) throw new NotFoundException("Ticket not found");
    return ticket;
  }

  async update(id: string, dto: UpdateTicketDto) {
    const updated = await this.ticketModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException("Ticket not found");
    return updated;
  }

  async remove(id: string) {
    const removed = await this.ticketModel.findByIdAndDelete(id);
    if (!removed) throw new NotFoundException("Ticket not found");
    return removed;
  }
}
