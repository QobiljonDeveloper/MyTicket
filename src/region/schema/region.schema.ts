import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { District } from "src/district/schemas/district.schema";
import { Venue } from "src/venue/schemas/venue.schema";

export type RegionDocument = HydratedDocument<Region>;

@Schema({ versionKey: false, timestamps: false })
export class Region {
  @Prop()
  name: string;

    @Prop({
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "District",
        },
      ],
    })
    districts: District[];

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

export const RegionSchema = SchemaFactory.createForClass(Region);
