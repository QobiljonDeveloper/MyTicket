import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Types } from "mongoose";
import { Region } from "src/region/schema/region.schema";
import { District } from "src/district/schemas/district.schema";
import { VenuePhoto } from "../../venue_photo/schemas/venue_photo.schema";

export type VenueDocument = HydratedDocument<Venue>;

@Schema({ versionKey: false, timestamps: false })
export class Venue {
  @Prop()
  name: string;

  @Prop()
  address: string;

  @Prop()
  location: string;

  @Prop()
  site: string;

  @Prop()
  phone: string;

  @Prop()
  schema: string;
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  })
  region: Region;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "District",
  })
  district: District;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VenuePhoto",
      },
    ],
    default: [],
  })
  venuePhoto: (Types.ObjectId | VenuePhoto)[];
}

export const VenueSchema = SchemaFactory.createForClass(Venue);
