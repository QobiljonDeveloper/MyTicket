import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema({ timestamps: true })
export class CartItem extends Document {
  @Prop({ type: String, required: true })
  cart_id: string;

  @Prop({ type: String, required: true })
  ticket_id: string;
}

export const CartItemSchema = SchemaFactory.createForClass(CartItem);
