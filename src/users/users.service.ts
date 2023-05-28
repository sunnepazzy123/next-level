import { Injectable, NotFoundException } from '@nestjs/common';
import { AxiosService } from 'src/config/axios.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UserDto } from './dto/user.dto';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

export const scrypt = promisify(_scrypt);

@Injectable()
export class UsersService {
  constructor(private http: AxiosService) {}

  async get(): Promise<UserDto[]> {
    const users = (await this.http.axios.get('/users')).data;
    return users;
  }

  async getOne(id: number): Promise<UserDto | null> {
    try {
      const users = (await this.http.axios.get(`/users/${id}`)).data;
      return users;
    } catch (error) {
      return null;
    }
  }

  async save(user: CreateUserDto): Promise<UserDto> {
    const newUser = (await this.http.axios.post('/users', user)).data;
    return newUser;
  }

  async update(id: number, attrs: Partial<UserDto>) {
    const user = await this.getOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }

    if (attrs.password) {
      //generate a salt
      const salt = randomBytes(8).toString('hex');

      //generate a hash
      const hash = (await scrypt(attrs.password, salt, 32)) as Buffer;

      const hashSaltedPassword = salt + '.' + hash.toString('hex');
      user.password = hashSaltedPassword;
    }

    user.email = attrs.email || user.email;
    user.name = attrs.name || user.name;

    return (await this.http.axios.put(`/users/${id}`, user)).data;
  }

  async delete(id: number) {
    const user = await this.getOne(id);
    if (!user) {
      throw new NotFoundException('user not found');
    }
    return (await this.http.axios.delete(`/users/${id}`)).data;
  }

  async findByEmail(email: string) {
    const users = await this.get();
    return users.find((user) => user.email === email);
  }
}
