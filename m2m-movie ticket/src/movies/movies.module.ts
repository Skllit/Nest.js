import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { MoviesService } from './movies.service';
import { MoviesController } from './movies.controller';
import { Theater } from '../theaters/theater.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Theater])],
  providers: [MoviesService],
  controllers: [MoviesController],
})
export class MoviesModule {}
