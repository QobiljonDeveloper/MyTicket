import { IsString, IsOptional, IsNumber, IsDateString } from "class-validator";

export class CreateCartDto {
  @IsString()
  customer_id: string;

  @IsOptional()
  @IsDateString()
  finishedAt?: Date;

  @IsNumber()
  status_id: number;
}
