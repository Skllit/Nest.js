import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectinfoDto } from './dto/create-projectinfo.dto';
import { UpdateProjectinfoDto } from './dto/update-projectinfo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Projectinfo } from './entities/projectinfo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectinfoService {
  constructor(
    @InjectRepository(Projectinfo)
    private readonly projectinfoRepository: Repository<Projectinfo>,
  ) {}

  async create(createProjectinfoDto: CreateProjectinfoDto): Promise<Projectinfo> {
    const project = this.projectinfoRepository.create(createProjectinfoDto);
    return this.projectinfoRepository.save(project);
  }

  async findAll(): Promise<Projectinfo[]> {
    return this.projectinfoRepository.find();
  }

  async findOne(id: number): Promise<Projectinfo> {
    const project = await this.projectinfoRepository.findOneBy({ id });
    if (!project) {
      throw new NotFoundException(`Projectinfo with ID ${id} not found`);
    }
    return project;
  }

  async update(id: number, updateProjectinfoDto: UpdateProjectinfoDto): Promise<Projectinfo> {
    const project = await this.projectinfoRepository.preload({
      id,
      ...updateProjectinfoDto,
    });

    if (!project) {
      throw new NotFoundException(`Projectinfo with ID ${id} not found`);
    }

    return this.projectinfoRepository.save(project);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projectinfoRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Projectinfo with ID ${id} not found`);
    }
  }
}
