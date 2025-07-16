import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Cart extends Document {
  @Prop({ type: String, required: true })
  customer_id: string;

  @Prop({ type: Date, default: null })
  finishedAt: Date;

  @Prop({ type: Number, required: true })
  status_id: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
