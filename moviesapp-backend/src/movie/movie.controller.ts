import { Controller, Get, Post, Query } from '@nestjs/common';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/load')
  load(@Query('pages') pages = 10) {
    this.movieService.loadMovies(pages);
    return {
      success: 'ok',
    };
  }

  @Get('/movies')
  async movies() {
    return this.movieService.findAll();
  }

  @Get('/favorite')
  async favorite(@Query('userId') userId: number) {
    return this.movieService.fetch_favorite(userId);
  }

  @Post('/mark')
  async mark(
    @Query('userId') userId: number,
    @Query('movieId') movieId: number,
  ) {
    return this.movieService.mark_favorite(userId, movieId);
  }
}
