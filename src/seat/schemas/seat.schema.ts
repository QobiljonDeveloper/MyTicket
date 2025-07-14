import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type SeatDocument = HydratedDocument<Seat>;

@Schema({ versionKey: false, timestamps: true })
export class Seat {
  @Prop()
  sector: string;

  @Prop()
  row_number: string;

  @Prop()
  number: string;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: "Venue", required: true })
  venue_id: MongooseSchema.Types.ObjectId;

  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "SeatType",
    required: true,
  })
  seat_type_id: MongooseSchema.Types.ObjectId;

  @Prop()
  location_in_schema: string;
}

export const SeatSchema = SchemaFactory.createForClass(Seat);
