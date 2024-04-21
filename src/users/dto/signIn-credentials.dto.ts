import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class SignInUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
