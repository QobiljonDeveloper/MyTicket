import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
  HumanCategory,
  HumanCategoryDocument,
} from "./schemas/human_category.schema";
import { CreateHumanCategoryDto } from "./dto/create-human_category.dto";
import { UpdateHumanCategoryDto } from "./dto/update-human_category.dto";

@Injectable()
export class HumanCategoryService {
  constructor(
    @InjectModel(HumanCategory.name)
    private humanCategoryModel: Model<HumanCategoryDocument>
  ) {}

  async create(dto: CreateHumanCategoryDto) {
    return this.humanCategoryModel.create(dto);
  }

  async findAll() {
    return this.humanCategoryModel.find().exec();
  }

  async findOne(id: string) {
    const item = await this.humanCategoryModel.findOne({ id }).exec();
    if (!item) throw new NotFoundException("Category not found");
    return item;
  }

  async update(id: string, dto: UpdateHumanCategoryDto) {
    const updated = await this.humanCategoryModel
      .findOneAndUpdate({ id }, dto, {
        new: true,
      })
      .exec();
    if (!updated) throw new NotFoundException("Category not found");
    return updated;
  }

  async remove(id: string) {
    const res = await this.humanCategoryModel.findOneAndDelete({ id }).exec();
    if (!res) throw new NotFoundException("Category not found");
    return res;
  }
}
