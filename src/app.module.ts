import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import { AdminModule } from "./admin/admin.module";
import { AuthModule } from "./auth/auth.module";
import { TypesModule } from "./types/types.module";
import { RegionModule } from "./region/region.module";
import { SeatTypeModule } from './seat_type/seat_type.module';
import { LangModule } from './lang/lang.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
