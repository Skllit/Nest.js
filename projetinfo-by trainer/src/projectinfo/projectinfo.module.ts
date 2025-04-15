import { Module } from '@nestjs/common';
import { ProjectinfoService } from './projectinfo.service';
import { ProjectinfoController } from './projectinfo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projectinfo } from './entities/projectinfo.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Projectinfo]),
  ],
  controllers: [ProjectinfoController],
  providers: [ProjectinfoService],
})
export class ProjectinfoModule {}
