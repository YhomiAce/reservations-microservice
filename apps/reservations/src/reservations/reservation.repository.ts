import { Injectable, Logger } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {ReservationDocument} from "./entities/reservation.entity"
import { Model } from "mongoose";
import {  AbstractRepository } from "@app/common";

@Injectable()
export class ReservationRepository extends AbstractRepository<ReservationDocument> {
    protected readonly logger = new Logger(ReservationRepository.name);

    constructor(
        @InjectModel(ReservationDocument.name)
        reservationModel: Model<ReservationDocument>
    ){
        super(reservationModel)
    }

}