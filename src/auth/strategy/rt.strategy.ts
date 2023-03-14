// refresh token strategy

import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class RTStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('RT_SECRET'),
    });
  }

  async validate(req: Request, payload: { sub: number; username: string }) {
    const user = this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    const refreshToken = req.get('authorization').replace('Bearer', '').trim();
    return { ...user, refreshToken };
  }
}
