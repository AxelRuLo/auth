import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from '@auth/auth.service';
import { AuthController } from '@auth/auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@src/user/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JWTStrategy } from '@auth/strategies/jwt.strategy';
import { AddressModule } from '@address/address.module';
import { MailModule } from '@mail/mail.module';
import { UserModule } from '@src/user/user.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JWTStrategy],
  imports: [
    forwardRef(() => UserModule),
    AddressModule,
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '2h' },
      }),
    }),
    MailModule,
  ],
  exports: [JWTStrategy, TypeOrmModule, PassportModule, JwtModule, AuthService],
})
export class AuthModule {}
