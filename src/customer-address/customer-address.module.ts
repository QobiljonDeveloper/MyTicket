import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerAddressService } from "./customer-address.service";
import { CustomerAddressController } from "./customer-address.controller";
import {
  CustomerAddress,
  CustomerAddressSchema,
} from "./schemas/customer-address.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerAddress.name, schema: CustomerAddressSchema },
    ]),
  ],
  controllers: [CustomerAddressController],
  providers: [CustomerAddressService],
})
export class CustomerAddressModule {}
