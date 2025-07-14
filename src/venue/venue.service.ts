import { Injectable } from "@nestjs/common";
import { CreateVenueDto } from "./dto/create-venue.dto";
import { UpdateVenueDto } from "./dto/update-venue.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Venue } from "./schemas/venue.schema";
import { District } from "src/district/schemas/district.schema";
import { Region } from "src/region/schema/region.schema";

@Injectable()
export class VenueService {
  constructor(
    @InjectModel(Venue.name) private readonly venueSchema: Model<Venue>,
    @InjectModel(District.name)
    private readonly districtSchema: Model<District>,
    @InjectModel(Region.name) private readonly regionSchema: Model<Region>
  ) {}
  async create(createVenueDto: CreateVenueDto) {
    const candidate = await this.venueSchema.findOne({
      name: createVenueDto.name,
    });
    if (candidate) {
      throw new Error("Bunday venue allaqachon mavjud");
    }
    const district = await this.districtSchema.findById(
      createVenueDto.district_id
    );
    if (!district) {
      throw new Error("Bunday district allaqachon mavjud");
    }
    const region = await this.regionSchema.findById(createVenueDto.region_id);
    if (!region) {
      throw new Error("Bunday region allaqachon mavjud");
    }
    const venue = await this.venueSchema.create(createVenueDto);
    await district.save();
    await region.save();
    return venue;
  }

  async findAll() {
    return this.venueSchema.find().populate("district").populate("region");
  }

  async findOne(id: string) {
    return this.venueSchema
      .findById(id)
      .populate("district")
      .populate("region");
  }

  async update(id: string, updateVenueDto: UpdateVenueDto) {
    return this.venueSchema
      .findByIdAndUpdate(id, updateVenueDto)
      .populate("district")
      .populate("region");
  }

  async remove(id: string) {
    return this.venueSchema
      .findByIdAndDelete(id)
      .populate("district")
      .populate("region");
  }
}
