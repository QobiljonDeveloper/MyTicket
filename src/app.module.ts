import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { TypesModule } from "./types/types.module";
import { RegionModule } from "./region/region.module";
import { SeatTypeModule } from "./seat_type/seat_type.module";
import { LangModule } from "./lang/lang.module";
import { TicketStatusModule } from "./ticket_status/ticket_status.module";
import { PaymentMethodModule } from "./payment_method/payment_method.module";
import { DeliveryMethodModule } from "./delivery_method/delivery_method.module";
import { DistrictModule } from "./district/district.module";
import { VenueModule } from "./venue/venue.module";
import { VenuePhotoModule } from "./venue_photo/venue_photo.module";
import { CustomerModule } from "./customer/customer.module";
import { CustomerAuthModule } from "./customer-auth/customer-auth.module";
import { CustomerCardModule } from './customer-card/customer-card.module';
import { CustomerAddressModule } from './customer-address/customer-address.module';
import { SeatModule } from './seat/seat.module';
import { HumanCategoryModule } from './human_category/human_category.module';
import { EventTypeModule } from './event_type/event_type.module';
import { EventModule } from './event/event.module';
import { TicketModule } from './ticket/ticket.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: ".env", isGlobal: true }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    AdminModule,
    AuthModule,
    TypesModule,
    RegionModule,
    SeatTypeModule,
    LangModule,
    TicketStatusModule,
    PaymentMethodModule,
    DeliveryMethodModule,
    DistrictModule,
    VenueModule,
    VenuePhotoModule,
    CustomerModule,
    CustomerAuthModule,
    CustomerCardModule,
    CustomerAddressModule,
    SeatModule,
    HumanCategoryModule,
    EventTypeModule,
    EventModule,
    TicketModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
