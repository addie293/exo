import { IsString, Length } from 'class-validator';

export class MovieDto {
  @IsString()
  @Length(3, 16)
  moviename: string;

  @IsString()
  @Length(3, 8)
  password: string;
}
