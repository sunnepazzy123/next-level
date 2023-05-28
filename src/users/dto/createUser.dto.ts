import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'email', example: 'ayo@gmail.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'password', example: 'password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'fullName', example: 'sunday king' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
