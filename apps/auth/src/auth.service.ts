import { Injectable } from '@nestjs/common';
import { User } from './users/entities/users.entity';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ){}

  async login(user: User, response: Response) {
    const tokenPayload  = {
      userId: user._id.toHexString()
    };
    const expires = new Date();
    expires.setSeconds(
      expires.getSeconds() + this.configService.get("JWT_EXPIRATION")
    );
    const token = this.jwtService.sign(tokenPayload)
    response.cookie('Authentication', token, {
      httpOnly: true,
      expires
    })

  }
}
