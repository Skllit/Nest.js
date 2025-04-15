import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { Theater } from './theater.entity';
import { CreateTheaterDto } from './dto/create-theater.dto';
import { UpdateTheaterDto } from './dto/update-theater.dto';

@Controller('theaters')
export class TheatersController {
  constructor(private readonly theatersService: TheatersService) {}

  @Post()
  create(@Body() createTheaterDto: CreateTheaterDto): Promise<Theater> {
    return this.theatersService.create(createTheaterDto);
  }

  @Get()
  findAll(): Promise<Theater[]> {
    return this.theatersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Theater> {
    return this.theatersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTheaterDto: UpdateTheaterDto): Promise<Theater> {
    return this.theatersService.update(+id, updateTheaterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.theatersService.remove(+id);
  }
}
