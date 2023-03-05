import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // to expose prisma module to the whole app
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
