import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'email', example: 'ayo@gmail.com' })
  @IsEmail()
  @IsOptional()
  email: string;

  @ApiProperty({ description: 'password', example: 'password' })
  @IsString()
  @IsOptional()
  password: string;

  @ApiProperty({ description: 'fullName', example: 'sunday king' })
  @IsString()
  @IsOptional()
  name: string;
}
