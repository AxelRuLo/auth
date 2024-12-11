import {
  IsEmail,
  IsLowercase,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EMAIL_REGEX } from '@auth/common/constants/constants';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'email@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsString()
  @IsLowercase()
  email: string;

  @ApiProperty({
    example: 'passWord1',
    required: true,
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(EMAIL_REGEX, {
    message:
      'The password must have an uppercase letter, a lowercase letter, and a number',
  })
  password: string;

  @ApiProperty({
    example: 'full name',
    required: true,
  })
  @IsString()
  @MinLength(3)
  fullName: string;
}
