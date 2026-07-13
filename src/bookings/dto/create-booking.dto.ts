import { IsDateString, IsNumber } from 'class-validator';

export class CreateBookingDto {

  @IsNumber()
  serviceId: number;

  @IsDateString()
  bookingDate: string;
}