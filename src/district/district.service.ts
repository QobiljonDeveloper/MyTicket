import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateDistrictDto } from "./dto/create-district.dto";
import { UpdateDistrictDto } from "./dto/update-district.dto";
import { InjectModel } from "@nestjs/mongoose";
import { District } from "src/district/schemas/district.schema";
import { isValidObjectId, Model } from "mongoose";
import { Region } from "../region/schema/region.schema";

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District.name) private districtSchema: Model<District>,
    @InjectModel(Region.name) private regionSchema: Model<Region>
  ) {}
  async create(createDistrictDto: CreateDistrictDto) {
    const { region_id } = createDistrictDto;

    if (!isValidObjectId(region_id)) {
      throw new BadRequestException("Region ID no'to'gri");
    }
    const region = await this.regionSchema.findById(region_id);
    if (!region) {
      throw new BadRequestException("Bunday Region allaqachon mavjud");
    }
    const district = await this.districtSchema.create(createDistrictDto);
    region.districts.push(district);
    await region.save();
    return district;
  }

  findAll() {
    return this.districtSchema.find().populate("region");
  }

  findOne(id: string) {
    return this.districtSchema.findById(id).populate("region");
  }

  update(id: string, updateDistrictDto: UpdateDistrictDto) {
    return this.districtSchema.findByIdAndUpdate(id, updateDistrictDto);
  }

  remove(id: string) {
    return this.districtSchema.findByIdAndDelete(id);
  }
}
