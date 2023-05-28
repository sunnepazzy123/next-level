import { Exclude, Expose } from 'class-transformer';

export class UserDto {
  @Exclude()
  id: string;

  @Expose()
  email: string;

  @Exclude()
  password: string;

  @Expose()
  name: string;
}
