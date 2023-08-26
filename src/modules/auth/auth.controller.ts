import { AuthService } from './auth.service';
import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { SigninDto } from './dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  @HttpCode(HttpStatus.OK)
  async signin(@Body() dto: SigninDto) {
    return await this.authService.signin(dto);
  }
}
