// src/authors/authors.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  create(authorData: Partial<Author>): Promise<Author> {
    const author = this.authorsRepository.create(authorData);
    return this.authorsRepository.save(author);
  }

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find({ relations: ['posts'] });
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOne({
      where: { id },
      relations: ['posts'],
    });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
    return author;
  }

  async update(id: number, updateData: Partial<Author>): Promise<Author> {
    await this.authorsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.authorsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }
  }
}
