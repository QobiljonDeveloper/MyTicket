import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateCustomerDto {
  first_name: string;

  last_name: string;

  phone: string;

  email: string;

  password: string;
  birth_date: string;

  gender: string;

  lang_id: string;
}
