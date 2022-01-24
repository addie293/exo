import { Favorite } from './favorite.entity';
import { MovieInterface } from './movie.interace';
import { Movie } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class MovieService {
  private MOVIE_API_KEY = '2e0e71ac05f5a00156b552a5b4153470';
  private NOW_PLAYING_MOVIES_URL =
    'https://api.themoviedb.org/3/movie/now_playing';

  constructor(
    @InjectRepository(Movie)
    private moviesRepo: Repository<Movie>,
    @InjectRepository(Favorite)
    private favoritesRepo: Repository<Favorite>,
    private httpService: HttpService,
  ) {}

  findOne(title: string): Promise<Movie> {
    return this.moviesRepo.findOne({ title: title });
  }

  findAll(): Promise<Movie[]> {
    return this.moviesRepo.find();
  }

  // load sample movies.
  loadMovies(pages) {
    const pageList = [...Array(pages).keys()];
    pageList.forEach(async (pageId) => {
      const tmdbObservable = this.httpService.post(
        `${this.NOW_PLAYING_MOVIES_URL}?api_key=${
          this.MOVIE_API_KEY
        }&language=en-US&page=${pageId + 1}`,
      );
      tmdbObservable.subscribe((movies) =>
        movies.data.results.map((movie) =>
          this.insert({
            movieId: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            overview: movie.overview,
            backdrop_path: movie.backdrop_path,
          }),
        ),
      );
    });
  }

  // add new movie into database.
  async insert(movieToAdd: MovieInterface): Promise<Movie> {
    const movie = this.moviesRepo.create(movieToAdd);
    return this.moviesRepo.save(movie);
  }

  // fetch favorite movie for user.
  async fetch_favorite(userId: number): Promise<Favorite[]> {
    return this.favoritesRepo.find({
      userId: userId,
    });
  }

  // add new favorite into database.
  async mark_favorite(userId: number, movieId: number): Promise<Favorite> {
    const favorite = await this.favoritesRepo.find({
      userId: userId,
      movieId: movieId,
    });
    if (favorite.length > 0) return null;

    const mark = this.favoritesRepo.create({
      userId: userId,
      movieId: movieId,
    });
    return this.favoritesRepo.save(mark);
  }
}
