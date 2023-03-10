import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor() {}
  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  getUser(@Req() req: Request) {
    console.log(req.user);
    return 'ya hla ystaaaa';
  }
  @Get()
  getUsers() {
    return 'all users yastaa';
  } // paginated ....
}
