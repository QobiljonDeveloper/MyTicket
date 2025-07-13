import { BadGatewayException, Injectable } from "@nestjs/common";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { UpdateAdminDto } from "./dto/update-admin.dto";
import { InjectModel } from "@nestjs/mongoose";
import { Admin } from "./schemas/admin.schema";
import { Model } from "mongoose";
import * as bcrypt from "bcrypt";

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Admin.name) private readonly adminSchema: Model<Admin>
  ) {}
  async create(createAdminDto: CreateAdminDto) {
    const { password, confirm_password, ...rest } = createAdminDto;

    if (password !== confirm_password) {
      throw new BadGatewayException("Parollar mos emas");
    }

    const hashedPassword = await bcrypt.hash(password, 7);

    return this.adminSchema.create({
      ...rest,
      password: hashedPassword,
    });
  }

  findAll() {
    return this.adminSchema.find();
  }

  findOne(id: string) {
    return this.adminSchema.findById(id);
  }

  update(id: string, updateAdminDto: UpdateAdminDto) {
    return this.adminSchema.findByIdAndUpdate(id, updateAdminDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.adminSchema.findByIdAndDelete(id);
  }

  async findAdminByEmail(email: string) {
    return this.adminSchema.findOne({ email });
  }
}
