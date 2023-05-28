import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { AuthService } from './auth/auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { Serialize } from 'src/interceptors/serialize.interceptors';
import { UserDto } from './dto/user.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('auth/users')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  get() {
    return this.usersService.get();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get('/:id')
  getId(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getOne(id);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Put('/:id')
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateUserDto) {
    return this.usersService.update(id, body);
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }

  @Post('/register')
  register(@Body() user: CreateUserDto) {
    return this.authService.register(user);
  }

  @Post('/login')
  async login(@Body() credential: LoginDto) {
    const user = await this.authService.login(credential);
    const payload = {
      id: user.id,
      email: user.email,
    };
    return await this.jwtService.signAsync(payload);
  }
}
