import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, UserModule, PrismaModule], // isGlobal works as the decorator global it makes prisma service accecable in the whole app
})
export class AppModule {}
