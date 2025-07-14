import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { TypesModule } from "./types/types.module";
import { RegionModule } from "./region/region.module";
import { SeatTypeModule } from './seat_type/seat_type.module';
import { LangModule } from './lang/lang.module';
import { TicketStatusModule } from './ticket_status/ticket_status.module';
import { PaymentMethodModule } from './payment_method/payment_method.module';
import { DeliveryMethodModule } from './delivery_method/delivery_method.module';
import { DistrictModule } from './district/district.module';
import { VenueModule } from './venue/venue.module';
import { VenuePhotoModule } from './venue_photo/venue_photo.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
