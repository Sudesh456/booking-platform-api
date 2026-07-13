import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Booking } from './entities/booking.entity';
import { Service } from '../services/entities/service.entity';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {

  constructor(
    @InjectRepository(Booking)
    private bookingRepository: Repository<Booking>,

    @InjectRepository(Service)
    private serviceRepository: Repository<Service>,
  ) {}

  async create(createBookingDto: CreateBookingDto) {

    const service = await this.serviceRepository.findOne({
      where: {
        id: createBookingDto.serviceId,
      },
    });

    if (!service) {
      throw new NotFoundException(
        'Service not found',
      );
    }

    const booking = this.bookingRepository.create({
      service,
      bookingDate: new Date(
        createBookingDto.bookingDate,
      ),
      status: 'PENDING',
    });

    return this.bookingRepository.save(booking);
  }


  findAll() {
    return this.bookingRepository.find({
      relations: [
        'service',
      ],
    });
  }


  findOne(id: number) {
    return this.bookingRepository.findOne({
      where: {
        id,
      },
      relations: [
        'service',
      ],
    });
  }


  async updateStatus(
    id: number,
    status: string,
  ) {
    const booking = await this.findOne(id);

    if (!booking) {
      throw new NotFoundException(
        'Booking not found',
      );
    }

    booking.status = status;

    return this.bookingRepository.save(
      booking,
    );
  }


  async remove(id:number) {
    const booking = await this.findOne(id);

    if (!booking) {
      throw new NotFoundException(
        'Booking not found',
      );
    }

    return this.bookingRepository.remove(
      booking,
    );
  }
}