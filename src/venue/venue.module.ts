import { Module } from '@nestjs/common';
import { VenueService } from './venue.service';
import { VenueController } from './venue.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Venue, VenueSchema } from './schemas/venue.schema';
import { Region, RegionSchema } from 'src/region/schema/region.schema';
import { District, DistrictSchema } from 'src/district/schemas/district.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Venue.name, schema: VenueSchema },
      { name: Region.name, schema: RegionSchema },
      { name: District.name, schema: DistrictSchema },
    ]),
  ],
  controllers: [VenueController],
  providers: [VenueService],
})
export class VenueModule {}
