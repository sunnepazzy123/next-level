import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService, scrypt } from '../users.service';
import { CreateUserDto } from '../dto/createUser.dto';
import { randomBytes } from 'crypto';
import { LoginDto } from '../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(user: CreateUserDto) {
    const userFound = await this.usersService.findByEmail(user.email);
    if (userFound) {
      throw new BadRequestException('User already exist');
    }
    //generate a salt
    const salt = randomBytes(8).toString('hex');

    //generate a hash
    const hash = (await scrypt(user.password, salt, 32)) as Buffer;

    const hashSaltedPassword = salt + '.' + hash.toString('hex');
    user.password = hashSaltedPassword;
    return this.usersService.save(user);
  }

  async login(credential: LoginDto) {
    const user = await this.usersService.findByEmail(credential.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const [salt, storedHash] = user.password.split('.');
    //generate a hash
    const hash = (await scrypt(credential.password, salt, 32)) as Buffer;

    if (hash.toString('hex') !== storedHash) {
      throw new BadRequestException('Invalid credential');
    }
    return user;
  }
}
