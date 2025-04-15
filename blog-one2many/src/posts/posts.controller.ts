// src/posts/posts.controller.ts
import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as BlogPost } from './post.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  create(@Body() postData: Partial<BlogPost> & { authorId: number }): Promise<BlogPost> {
    return this.postsService.create(postData);
  }

  @Get()
  findAll(): Promise<BlogPost[]> {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<BlogPost> {
    return this.postsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateData: Partial<BlogPost>): Promise<BlogPost> {
    return this.postsService.update(+id, updateData);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.postsService.remove(+id);
  }

  // Get all posts for a given author
  @Get('author/:authorId')
  findByAuthor(@Param('authorId') authorId: string): Promise<BlogPost[]> {
    return this.postsService.findByAuthor(+authorId);
  }
}
