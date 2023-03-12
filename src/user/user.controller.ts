import { Body, Controller, Get, Param, ParseIntPipe, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';
import { JwtGuard } from 'src/auth/guards';
import { getUser } from 'src/common/decorator';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get(':id')
  /* ParseIntPipe is used to validate and parse the parameter as a number, if the inserted id is string it will return bad request.
 here we extract the value of the id parameter from the route path, and to parse it as an integer using the ParseIntPipe.
ParseIntPipe is a built-in pipe in NestJS that converts the extracted string parameter value to an integer. If the value cannot be converted to an integer, the pipe throws a BadRequestException.
id: number specifies the type of the id parameter in the controller method. In this case, it is a number because the ParseIntPipe will return an integer value.
In summary, @Param('id', ParseIntPipe) tells NestJS to extract the id parameter value from the route path and parse it as an integer, while id: number specifies the resulting type of the id parameter in the controller method.
  */
  getUser(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUser(id);
  }
  /* here if we used somehting like  getUsers(@Body() dto: AuthDto) then it will validate the request type
  against the authDto and  return bad request if a filed is missing or its type does not match! 
  because we are using ValidationPipe as a puplic pipe in the main.ts
  */

  @Get('')
  getUsers() {
    return 'all users yastaa';
  } // paginated ....

  /*
  or we can use custom decorators like this in get 'me', we add use to the http req and return it -check the getUser()- 
*/
  @Get('me')
  getMe(@getUser() user: User) {
    return 'all users yastaa';
  }
}
