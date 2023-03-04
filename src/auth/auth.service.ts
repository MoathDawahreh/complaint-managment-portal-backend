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

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

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

      delete user.pwd;
      return user;
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

    delete user.pwd;
    return user;
  }
}
