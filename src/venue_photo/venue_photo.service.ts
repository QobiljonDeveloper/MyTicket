import { BadRequestException, Injectable } from "@nestjs/common";
import { Venue } from "../venue/schemas/venue.schema";
import { InjectModel } from "@nestjs/mongoose";
import { VenuePhoto } from "./schemas/venue_photo.schema";
import { CreateVenuePhotoDto } from "./dto/create-venue_photo.dto";
import { isValidObjectId, Model } from "mongoose";
import { UpdateVenuePhotoDto } from "./dto/update-venue_photo.dto";

@Injectable()
export class VenuePhotoService {
  constructor(
    @InjectModel(Venue.name) private readonly venueSchema: Model<Venue>,
    @InjectModel(VenuePhoto.name)
    private readonly venuePhotoSchema: Model<VenuePhoto>
  ) {}

  async create(createVenuePhotoDto: CreateVenuePhotoDto) {
    const { venue, url } = createVenuePhotoDto;

    if (!isValidObjectId(venue)) {
      throw new BadRequestException("Venue ID noto'g'ri");
    }

    const venueExists = await this.venueSchema.findById(venue);
    if (!venueExists) {
      throw new BadRequestException("Bunday venue mavjud emas");
    }

    const venuePhoto = await this.venuePhotoSchema.create({
      url,
      venue,
    });

    await this.venueSchema.updateOne(
      { _id: venue },
      { $push: { venuePhoto: venuePhoto._id } }
    );

    return venuePhoto;
  }

  findAll() {
    return this.venuePhotoSchema.find().populate("venue");
  }

  findOne(id: string) {
    return this.venuePhotoSchema.findById(id).populate("venue");
  }

  update(id: string, updateVenuePhotoDto: UpdateVenuePhotoDto) {
    return this.venuePhotoSchema
      .findByIdAndUpdate(id, updateVenuePhotoDto, {
        new: true,
      })
      .populate("venue");
  }

  remove(id: string) {
    return this.venuePhotoSchema.findByIdAndDelete(id);
  }
}
