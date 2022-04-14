import { Body, Controller, Post } from '@nestjs/common';

import { AuthService } from './auth.service';
import { SignUpDto, SignInDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  public signup(@Body() dto: SignUpDto) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  public signin(@Body() dto: SignInDto) {
    return this.authService.signin(dto);
  }
}
