import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '@auth/user/user.module';
import { AddressModule } from '@auth/address/address.module';
import { MailModule } from '@auth/mail/mail.module';
import { AuthModule } from '@auth/auth/auth.module';
import { CommonModule } from '@auth/common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [],
      autoLoadEntities: true,
      // TODO: only for development
      synchronize: true,
    }),
    AddressModule,
    AuthModule,
    CommonModule,
    UserModule,
    MailModule,
  ],
})
export class GeneralAuthModule {}
