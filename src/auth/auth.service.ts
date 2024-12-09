import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '@src/user/dto/login-user.dto';
import { JwtPayload } from '@src/auth/types';
import { JwtService } from '@nestjs/jwt';
import { MailService } from '@mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly jtwService: JwtService,
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}

  async login(loginUserDto: LoginUserDto) {
    const { password, email } = loginUserDto;
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, id: true, emailConfirmed: true },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciales inválidas (email)');
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credenciales inválidas (password)');
    }
    if (!user.emailConfirmed) {
      throw new UnauthorizedException(
        'Por favor confirme su correo electrónico para iniciar sesión',
      );
    }
    return {
      token: this.generateJTW({ id: user.id }),
    };
  }

  async checkAuthStatus(id: string) {
    return {
      token: this.generateJTW({ id }),
    };
  }

  async resendConfirmationEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, id: true },
    });
    if (!user) {
      throw new BadRequestException('El correo electrónico no está registrado');
    }
    return this.handleConfirmationToken(user);
  }

  async confirmEmail(token: string) {
    try {
      const { id } = this.jtwService.verify(token, {
        secret: this.configService.get('JWT_CONFIRMATION_SECRET'),
      });
      await this.userRepository.update(id, { emailConfirmed: true });
      return {
        message: 'Correo electrónico confirmado',
      };
    } catch (error) {
      throw new UnauthorizedException('El token ha expirado o es inválido');
    }
  }

  private generateJTW(payload: JwtPayload): string {
    const token = this.jtwService.sign(payload);
    return token;
  }

  private generateConfirmationToken(id: string): string {
    return this.jtwService.sign(
      { id },
      {
        expiresIn: '1d',
        secret: this.configService.get('JWT_CONFIRMATION_SECRET'),
      },
    );
  }

  async handleConfirmationToken(user: User) {
    const confirmationToken = this.generateConfirmationToken(user.id);
    await this.mailService.sendUserConfirmation(user, confirmationToken);
    return {
      message:
        'Para iniciar sesión, confirme su correo electrónico con el enlace que le hemos enviado',
    };
  }
}
