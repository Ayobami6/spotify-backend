import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  twoFASecret: string;

  @IsOptional()
  @IsBoolean()
  enable2FA: boolean;
}
