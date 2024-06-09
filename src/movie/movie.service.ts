import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { RateMovieDto } from './dto/rate-movie.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    return this.moviesRepository.save(movie);
  }

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find();
  }

  findByGenre(genre: string): Promise<Movie[]> {
    return this.moviesRepository.find({ where: { genre } });
  }

  async rateMovie(id: number, rateMovieDto: RateMovieDto): Promise<Movie> {
    const movie = await this.moviesRepository.findOneBy({ id });
    if (movie) {
      movie.ratingCount++;
      movie.rating =
        (movie.rating * (movie.ratingCount - 1) + rateMovieDto.rating) /
        movie.ratingCount;
      movie.reviews.push({
        rating: rateMovieDto.rating,
        review: rateMovieDto.review,
      });
      return this.moviesRepository.save(movie);
    }
    return null;
  }

  findTopRated(): Promise<Movie[]> {
    return this.moviesRepository.find({ order: { rating: 'DESC' } });
  }
}
