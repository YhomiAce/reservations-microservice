import { Inject, Injectable } from '@nestjs/common';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';
import { ReservationRepository } from './reservation.repository';
import { PAYMENTS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { map } from 'rxjs';

@Injectable()
export class ReservationsService {
  constructor(
    private readonly reservationRepo: ReservationRepository,
    @Inject(PAYMENTS_SERVICE)
    private readonly paymentsService: ClientProxy,
  ) {}
  async create(createReservationDto: CreateReservationDto, user: UserDto) {
    return this.paymentsService
      .send('create_charge', {
        ...createReservationDto.charge,
        email: user.email
      })
      .pipe(
        map(async (response) => {
          // console.log({ response });
          const reservation = await this.reservationRepo.create({
            ...createReservationDto,
            timestamp: new Date(),
            userId: user._id,
            invoiceId: response.id
          });
          return reservation;
        }),
      );
  }

  async findAll() {
    return this.reservationRepo.find({});
  }

  async findOne(id: string) {
    return this.reservationRepo.findOne({ _id: id });
  }

  async update(id: string, updateReservationDto: UpdateReservationDto) {
    return this.reservationRepo.findOneAndUpdate(
      { _id: id },
      { $set: updateReservationDto },
    );
  }

  async remove(id: string) {
    return this.reservationRepo.findOneAndDelete({ _id: id });
  }
}
