import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@auth/user/entities/user.entity';
import { EMAIL_AUTHENTICATION_ERROR } from '@auth/common/constants/constants';

@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(user: User, token: string) {
    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Por favor, confirme su correo electrónico',
        template: 'email-confirmation',
        context: {
          name: user.fullName,
          url: `${this.configService.get('API_URL')}/auth/confirm-email?token=${token}`,
        },
      });
    } catch (error) {
      if (error?.code === EMAIL_AUTHENTICATION_ERROR) {
        throw new UnauthorizedException(
          'SMTP credentials are invalid. Please check your SMTP configuration',
        );
      }
      throw new InternalServerErrorException(
        'An error occurred while sending the confirmation email. Please try again later',
      );
    }
  }
}
