import { Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { UserDto } from '@app/common';

@Injectable()
export class ReservationsService {
  constructor(private readonly reservationRepo: ReservationRepository) {}
  create(createReservationDto: CreateReservationDto, user: UserDto) {
    return this.reservationRepo.create({
      ...createReservationDto,
      timestamp: new Date(),
      userId: user._id,
    });
  }

  findAll() {
    return this.reservationRepo.find({});
  }

  findOne(id: string) {
    return this.reservationRepo.findOne({ _id: id });
  }

  update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepo.findOneAndUpdate(
      { _id: id },
      { $set: updateReservationDto },
    );
  }

  remove(id: string) {
    return this.reservationRepo.findOneAndDelete({_id: id})
  }
}
