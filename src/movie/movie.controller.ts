import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { MovieService } from './movie.service';
import { CreateMovieDto } from './dto/create-movie.dto';
import { RateMovieDto } from './dto/rate-movie.dto';

@Controller('movies')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  create(@Body() createMovieDto: CreateMovieDto) {
    return this.movieService.create(createMovieDto);
  }

  @Get()
  findAll() {
    return this.movieService.findAll();
  }

  @Get('genre/:genre')
  findByGenre(@Param('genre') genre: string) {
    return this.movieService.findByGenre(genre);
  }

  @Patch(':id/rate')
  rateMovie(@Param('id') id: number, @Body() rateMovieDto: RateMovieDto) {
    return this.movieService.rateMovie(id, rateMovieDto);
  }

  @Get('top-rated')
  findTopRated() {
    return this.movieService.findTopRated();
  }
}
