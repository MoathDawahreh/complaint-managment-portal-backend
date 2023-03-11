import { Body, Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @UseGuards(AuthGuard('jwt')) // in auth/strategy where we difined the strategy type: PassportStrategy(Strategy, 'jwt')
  @Get(':id')
  getUser(@Req() req: Request) {
    const currentUser = req.user;
    const id = Number(req.params.id);
    if (!id) return 'Wrong Param type!'; // make type validation pipes like the auth
    return this.userService.getUser(id);
  }
  @Get()
  getUsers() {
    return 'all users yastaa';
  } // paginated ....
}
