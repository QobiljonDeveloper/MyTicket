import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type CustomerAddressDocument = HydratedDocument<CustomerAddress>;

@Schema({ versionKey: false, timestamps: true })
export class CustomerAddress {
  @Prop({
    type: MongooseSchema.Types.ObjectId,
    ref: "Customer",
  })
  customer_id: MongooseSchema.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  region_id: string;

  @Prop()
  district_id: string;

  @Prop()
  street: string;

  @Prop()
  house: string;

  @Prop()
  flat: string;

  @Prop()
  location: string;

  @Prop()
  post_index: string;

  @Prop()
  info: string;
}

export const CustomerAddressSchema =
  SchemaFactory.createForClass(CustomerAddress);
