import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProjectinfoService } from './projectinfo.service';
import { CreateProjectinfoDto } from './dto/create-projectinfo.dto';
import { UpdateProjectinfoDto } from './dto/update-projectinfo.dto';

@Controller('projectinfo')
export class ProjectinfoController {
  constructor(private readonly projectinfoService: ProjectinfoService) {}

  @Post()
  create(@Body() createProjectinfoDto: CreateProjectinfoDto) {
    return this.projectinfoService.create(createProjectinfoDto);
  }

  @Get()
  findAll() {
    return this.projectinfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectinfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProjectinfoDto: UpdateProjectinfoDto) {
    return this.projectinfoService.update(+id, updateProjectinfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.projectinfoService.remove(+id);
  }
}
