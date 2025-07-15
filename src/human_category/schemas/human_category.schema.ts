import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type HumanCategoryDocument = HumanCategory & Document;

@Schema({ timestamps: true })
export class HumanCategory {
  @Prop()
  name: string;

  @Prop()
  start_age: number;

  @Prop()
  finish_age: number;

  @Prop()
  gender: string;
}

export const HumanCategorySchema = SchemaFactory.createForClass(HumanCategory);
