import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Destination } from './entities/destination.entity';
import { CreateDestinationDto } from './dto/create-destination.dto';
import { UpdateDestinationDto } from './dto/update-destination.dto';

@Injectable()
export class DestinationsService {
  constructor(
    @InjectRepository(Destination)
    private destinationsRepository: Repository<Destination>,
  ) {}

  async create(createDestinationDto: CreateDestinationDto): Promise<Destination> {
    const destination = this.destinationsRepository.create(createDestinationDto);
    return this.destinationsRepository.save(destination);
  }

  async findAll(): Promise<Destination[]> {
    return this.destinationsRepository.find();
  }

  async findOne(id: number): Promise<Destination> {
    const destination = await this.destinationsRepository.findOne({
      where: { id },
      relations: ['attractions'],
    });
    
    if (!destination) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }
    
    return destination;
  }

  async update(id: number, updateDestinationDto: UpdateDestinationDto): Promise<Destination> {
    const destination = await this.findOne(id);
    
    Object.assign(destination, updateDestinationDto);
    
    return this.destinationsRepository.save(destination);
  }

  async remove(id: number): Promise<void> {
    const result = await this.destinationsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Destination with ID ${id} not found`);
    }
  }
}