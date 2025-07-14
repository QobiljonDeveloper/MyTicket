import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";

import { CustomerAuthService } from "./customer-auth.service";
import { CustomerAuthController } from "./customer-auth.controller";
import { CustomerService } from "../customer/customer.service";
import { Customer, CustomerSchema } from "../customer/schemas/customer.schema";

@Module({
  imports: [
    JwtModule.register({}),
    MongooseModule.forFeature([
      { name: Customer.name, schema: CustomerSchema },
    ]),
  ],
  controllers: [CustomerAuthController],
  providers: [CustomerAuthService, CustomerService],
})
export class CustomerAuthModule {}
