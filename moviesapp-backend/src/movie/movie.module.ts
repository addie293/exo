import { Favorite } from './favorite.entity';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { Movie } from './movie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Favorite]), HttpModule],
  providers: [MovieService],
  controllers: [MovieController],
})
export class MovieModule {}
