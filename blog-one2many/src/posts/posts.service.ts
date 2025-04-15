// src/posts/posts.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { Author } from '../authors/author.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  async create(postData: Partial<Post> & { authorId: number }): Promise<Post> {
    // Verify that the author exists
    const author = await this.authorsRepository.findOne({ where: { id: postData.authorId } });
    if (!author) {
      throw new NotFoundException(`Author with id ${postData.authorId} not found. Cannot create post.`);
    }
    // Create the post with the relation
    const post = this.postsRepository.create({
      title: postData.title,
      content: postData.content,
      author,
    });
    return this.postsRepository.save(post);
  }

  findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['author'] });
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postsRepository.findOne({ where: { id }, relations: ['author'] });
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    return post;
  }

  async update(id: number, updateData: Partial<Post>): Promise<Post> {
    await this.postsRepository.update(id, updateData);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.postsRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
  }

  // Additional endpoint: get posts by a specific author
  async findByAuthor(authorId: number): Promise<Post[]> {
    return this.postsRepository.find({
      where: { author: { id: authorId } },
      relations: ['author'],
    });
  }
}
