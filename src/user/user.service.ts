import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async getUser(userId: number) {
    // middleware to verify the user is authorized to access this api? // check if is admin
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) return 'Not Found!';

    delete user.pwd;
    return user;
  }
}
