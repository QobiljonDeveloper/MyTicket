import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Region } from "src/region/schema/region.schema";
import { Venue } from "src/venue/schemas/venue.schema";

export type DistrictDocument = HydratedDocument<District>;

@Schema({ versionKey: false, timestamps: false })
export class District {
  @Prop()
  name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
  })
  region: Region;

  @Prop({
    type: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Venue",
      },
    ],
  })
  venues: Venue;
}

export const DistrictSchema = SchemaFactory.createForClass(District);
