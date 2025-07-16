import { IsOptional, IsNumber, IsDateString, IsString } from "class-validator";

export class CreateBookingDto {
  @IsOptional()
  @IsString()
  cart_id?: string;

  @IsOptional()
  @IsDateString()
  finished?: Date;

  @IsNumber()
  payment_method_id: number;

  @IsNumber()
  delivery_method_id: number;

  @IsOptional()
  @IsString()
  discount_coupon_id?: string;

  @IsNumber()
  status_id: number;
}
