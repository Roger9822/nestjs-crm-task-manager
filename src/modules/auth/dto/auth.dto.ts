import { IsEmail, IsEnum, IsOptional, isString, IsString, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class RegisterDto {
  @IsString() 
  name: string;  

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
