import { IsString, Length } from 'class-validator';

export class UserDto {
  @IsString()
  @Length(3, 16)
  username: string;

  @IsString()
  @Length(3, 8)
  password: string;
}
