import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable() // we should annotate the class with Injectable if we want to allow injections in the class constructor
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {} // inject prisma in the AuthService class
  // JwtService is imported in the auth module from @nestjs/jwt
  async signup(dto: AuthDto) {
    try {
      // generate the password hash
      const hash = await argon.hash(dto.password);

      // save the new user in the db
      const user = await this.prisma.user.create({
        data: {
          email: dto.email,
          username: dto.username,
          isAdmin: dto.isAdmin,
          pwd: hash,
        },
      });

      // delete user.pwd;
        this.signToken(user.id, user.username);

    } catch (error) {
      if (error.message.includes('invalid value'))
        throw new BadRequestException({ message: 'Invalid type value!' });

      if (error instanceof PrismaClientKnownRequestError)
        if (error.code === 'P2002') throw new ForbiddenException('Credentials taken!');

      throw error;
    }
  }

  async login(dto: AuthDto) {
    //: Promise<AuthDto | null>
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
      },
    });
    // if no user throw exception
    if (!user) throw new UnauthorizedException('The username does not exsist!');

    // if the user exsits check if the passowrd correct
    const pwMatches = await argon.verify(user.pwd, dto.password);

    if (!pwMatches) throw new ForbiddenException('invalid password!');

    this.signToken(user.id, user.username);
  }

  signToken(userId: number, username: string): Promise<string> {
    const payload = {
      sub: userId,
      username,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '15min',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
