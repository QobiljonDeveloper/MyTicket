import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { EventType, EventTypeDocument } from "./schemas/event_type.schema";
import { Model } from "mongoose";
import { CreateEventTypeDto } from "./dto/create-event_type.dto";
import { UpdateEventTypeDto } from "./dto/update-event_type.dto";

@Injectable()
export class EventTypeService {
  constructor(
    @InjectModel(EventType.name)
    private readonly eventTypeModel: Model<EventTypeDocument>
  ) {}

  async create(dto: CreateEventTypeDto) {
    return this.eventTypeModel.create(dto);
  }

  async findAll() {
    return this.eventTypeModel
      .find()
      .populate("parent_event_type_id", "name")
      .exec();
  }

  async findOne(id: string) {
    const eventType = await this.eventTypeModel
      .findById(id)
      .populate("parent_event_type_id", "name")
      .exec();
    if (!eventType) throw new NotFoundException("Event type not found");
    return eventType;
  }

  async update(id: string, dto: UpdateEventTypeDto) {
    const updated = await this.eventTypeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();
    if (!updated) throw new NotFoundException("Event type not found");
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.eventTypeModel.findByIdAndDelete(id).exec();
    if (!deleted) throw new NotFoundException("Event type not found");
    return deleted;
  }
}
