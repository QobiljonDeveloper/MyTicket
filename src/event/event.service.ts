import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Event, EventDocument } from "./schemas/event.schema";
import { Model } from "mongoose";
import { CreateEventDto } from "./dto/create-event.dto";
import { UpdateEventDto } from "./dto/update-event.dto";

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name)
    private readonly eventModel: Model<EventDocument>
  ) {}

  async create(dto: CreateEventDto) {
    return this.eventModel.create(dto);
  }

  async findAll() {
    return this.eventModel
      .find()
      .populate("event_type_id", "name")
      .populate("human_category_id", "name")
      .populate("venue_id", "name")
      .populate("lang_id", "name")
      .exec();
  }

  async findOne(id: string) {
    const event = await this.eventModel
      .findById(id)
      .populate("event_type_id", "name")
      .populate("human_category_id", "name")
      .populate("venue_id", "name")
      .populate("lang_id", "name")
      .exec();
    if (!event) throw new NotFoundException("Event not found");
    return event;
  }

  async update(id: string, dto: UpdateEventDto) {
    const updated = await this.eventModel.findByIdAndUpdate(id, dto, {
      new: true,
    });
    if (!updated) throw new NotFoundException("Event not found");
    return updated;
  }

  async remove(id: string) {
    const removed = await this.eventModel.findByIdAndDelete(id);
    if (!removed) throw new NotFoundException("Event not found");
    return removed;
  }
}
