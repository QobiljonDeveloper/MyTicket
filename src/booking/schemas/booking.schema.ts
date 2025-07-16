import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class Booking extends Document {
  @Prop({ type: String, required: false }) 
  cart_id: string;

  @Prop({ type: Date, default: null })
  finished: Date;

  @Prop({ type: Number, required: true })
  payment_method_id: number;

  @Prop({ type: Number, required: true })
  delivery_method_id: number;

  @Prop({ type: String, required: false })
  discount_coupon_id?: string;

  @Prop({ type: Number, required: true })
  status_id: number;
}

export const BookingSchema = SchemaFactory.createForClass(Booking);
