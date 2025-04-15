import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Attraction } from './entities/attraction.entity';
import { CreateAttractionDto } from './dto/create-attraction.dto';
import { UpdateAttractionDto } from './dto/update-attraction.dto';
import { DestinationsService } from '../destinations/destinations.service';

@Injectable()
export class AttractionsService {
  constructor(
    @InjectRepository(Attraction)
    private attractionsRepository: Repository<Attraction>,
    private destinationsService: DestinationsService,
  ) {}

  async create(createAttractionDto: CreateAttractionDto): Promise<Attraction> {
    // Verify that the destination exists
    await this.destinationsService.findOne(createAttractionDto.destinationId);
    
    const attraction = this.attractionsRepository.create(createAttractionDto);
    return this.attractionsRepository.save(attraction);
  }

  async findAll(): Promise<Attraction[]> {
    return this.attractionsRepository.find({
      relations: ['destination'],
    });
  }

  async findOne(id: number): Promise<Attraction> {
    const attraction = await this.attractionsRepository.findOne({
      where: { id },
      relations: ['destination'],
    });
    
    if (!attraction) {
      throw new NotFoundException(`Attraction with ID ${id} not found`);
    }
    
    return attraction;
  }

  async findByDestination(destinationId: number): Promise<Attraction[]> {
    return this.attractionsRepository.find({
      where: { destinationId },
    });
  }

  async update(id: number, updateAttractionDto: UpdateAttractionDto): Promise<Attraction> {
    const attraction = await this.findOne(id);
    
    // If destination ID is changed, verify that the new destination exists
    if (updateAttractionDto.destinationId && 
        updateAttractionDto.destinationId !== attraction.destinationId) {
      await this.destinationsService.findOne(updateAttractionDto.destinationId);
    }
    
    Object.assign(attraction, updateAttractionDto);
    
    return this.attractionsRepository.save(attraction);
  }

  async remove(id: number): Promise<void> {
    const result = await this.attractionsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Attraction with ID ${id} not found`);
    }
  }
}
