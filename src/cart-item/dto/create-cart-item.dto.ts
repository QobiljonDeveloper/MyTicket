import { IsString } from 'class-validator';

export class CreateCartItemDto {
  @IsString()
  cart_id: string;

  @IsString()
  ticket_id: string;
}
