import mongoose from "mongoose";

export class CreateDistrictDto {
  region_id: mongoose.Schema.Types.ObjectId;
  name: string;
}
