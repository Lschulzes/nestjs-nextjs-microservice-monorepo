import {
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export enum UserRole {
  client = 'client',
  admin = 'admin',
}

export class SigninUserDTO {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @IsNotEmpty()
  password: string;
}

export class SignupUserDTO extends SigninUserDTO {
  @IsEmpty()
  role: UserRole;
}
