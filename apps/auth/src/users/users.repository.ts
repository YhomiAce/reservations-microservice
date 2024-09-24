import { AbstractRepository } from "@app/common";
import { Injectable, Logger } from "@nestjs/common";
import { User } from "./entities/users.entity";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
    protected readonly logger = new Logger(UsersRepository.name);
    constructor(
        @InjectModel(User.name) userModel: Model<User>
    ){
        super(userModel);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.model.findOne({email}).lean(true)
    }
}