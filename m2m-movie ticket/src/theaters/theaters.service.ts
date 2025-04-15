import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Theater } from './theater.entity';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';

@Injectable()
export class TheatersService {
  constructor(
    @InjectRepository(Theater)
    private readonly theaterRepository: Repository<Theater>,
  ) {}

  create(createTheaterDto: CreateTheaterDto): Promise<Theater> {
    const theater = this.theaterRepository.create(createTheaterDto);
    return this.theaterRepository.save(theater);
  }

  findAll(): Promise<Theater[]> {
    return this.theaterRepository.find({ relations: ['movies'] });
  }

  async findOne(id: number): Promise<Theater> {
    const theater = await this.theaterRepository.findOne({ where: { id }, relations: ['movies'] });
    if (!theater) {
      throw new NotFoundException(`Theater with id ${id} not found`);
    }
    return theater;
  }

  async update(id: number, updateTheaterDto: UpdateTheaterDto): Promise<Theater> {
    await this.theaterRepository.update(id, updateTheaterDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.theaterRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Theater with id ${id} not found`);
    }
  }
}
