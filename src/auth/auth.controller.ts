import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    // the body type should be of type authDto

    console.log('username -->', dto);
    return this.authService.signup(dto);
  }
  @Post('signin')
  siginin(@Body() dto: AuthDto) {
    return this.authService.login(dto);
  }

  @Post('logout')
  logout() {
    return this.authService.logout;
  }

  @Post('refresh')
  refreshTokens() {
    return this.authService.refreshTokens;
  }
}

// According to RESTful API conventions, GET requests are used for retrieving resources, while POST requests are used for creating resources
// . Sign-in involves verifying a user's credentials and granting access to protected resources,
// which is a process of creating a session or authentication token. Therefore,
//  it makes more sense to use a POST request for sign-in, as this aligns with the RESTful API convention of using POST for resource creation.
// Furthermore, GET requests are typically cached by web browsers and proxies,
// which could result in security vulnerabilities if used for authentication or session creation.
//  POST requests, on the other hand, are not cached and provide a more secure way to create sessions or authenticate users.
// Therefore, it is recommended to use a POST request for sign-in and follow RESTful API conventions.
