import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
  constructor() {}
  @UseGuards(AuthGuard('jwt')) // in auth/strategy where we difined the strategy type: PassportStrategy(Strategy, 'jwt')
  @Get(':id')
  getUser(@Req() req: Request) {
    console.log(req.params);
    return req.user;
  }
  @Get()
  getUsers() {
    return 'all users yastaa';
  } // paginated ....
}
