import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { LoginUserDto } from '@src/user/dto/login-user.dto';
import { AuthService } from '@auth/auth.service';
import { Auth, GetUser } from '@auth/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('resend-confirmation-email')
  resendConfirmationEmail(@Body('email') email: string) {
    return this.authService.resendConfirmationEmail(email);
  }

  @Get('confirm-email')
  confirmEmail(@Query('token') token: string) {
    return this.authService.confirmEmail(token);
  }

  @Post('login')
  signIn(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('check-status')
  @Auth()
  checkAuthStatus(@GetUser('id') id: string) {
    return this.authService.checkAuthStatus(id);
  }
}
