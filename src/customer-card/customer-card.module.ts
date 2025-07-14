import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { CustomerCardService } from "./customer-card.service";
import { CustomerCardController } from "./customer-card.controller"; // ❗ Controller import qilinmagan
import {
  CustomerCard,
  CustomerCardSchema,
} from "./schemas/customer-card.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CustomerCard.name, schema: CustomerCardSchema },
    ]),
  ],
  controllers: [CustomerCardController],
  providers: [CustomerCardService],
  exports: [CustomerCardService],
})
export class CustomerCardModule {}
