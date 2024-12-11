import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { EMAIL_REGEX } from '@auth/common/constants/constants';

export class LoginUserDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(EMAIL_REGEX, {
    message:
      'The password must have an uppercase letter, a lowercase letter, and a number',
  })
  password: string;
}
