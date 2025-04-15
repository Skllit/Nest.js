import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Theater } from '../theaters/theater.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
    @InjectRepository(Theater)
    private theatersRepository: Repository<Theater>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    let theaters: Theater[] = [];
    if (createMovieDto.theaterIds) {
      theaters = await this.theatersRepository.findBy({ id: In(createMovieDto.theaterIds) });
      if (theaters.length !== createMovieDto.theaterIds.length) {
        throw new NotFoundException('One or more theaters not found');
      }
    }
    const movie = this.moviesRepository.create({
      title: createMovieDto.title,
      description: createMovieDto.description,
      duration: createMovieDto.duration,
      theaters,
    });
    return this.moviesRepository.save(movie);
  }

  findAll(): Promise<Movie[]> {
    return this.moviesRepository.find({ relations: ['theaters'] });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id }, relations: ['theaters'] });
    if (!movie) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    const movie = await this.findOne(id);
    if (updateMovieDto.theaterIds) {
      const theaters = await this.theatersRepository.findBy({ id: In(updateMovieDto.theaterIds) });
      if (theaters.length !== updateMovieDto.theaterIds.length) {
        throw new NotFoundException('One or more theaters not found');
      }
      movie.theaters = theaters;
    }
    if (updateMovieDto.title !== undefined) {
      movie.title = updateMovieDto.title;
    }
    if (updateMovieDto.description !== undefined) {
      movie.description = updateMovieDto.description;
    }
    if (updateMovieDto.duration !== undefined) {
      movie.duration = updateMovieDto.duration;
    }
    return this.moviesRepository.save(movie);
  }

  async remove(id: number): Promise<void> {
    const result = await this.moviesRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Movie with id ${id} not found`);
    }
  }

  // Additional operation: search movies by title (partial match)
  async searchByTitle(title: string): Promise<Movie[]> {
    return this.moviesRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.theaters', 'theater')
      .where('movie.title LIKE :title', { title: `%${title}%` })
      .getMany();
  }
}
