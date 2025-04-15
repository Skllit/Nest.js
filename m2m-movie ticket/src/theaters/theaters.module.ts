import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Theater } from './theater.entity';
import { TheatersService } from './theaters.service';
import { TheatersController } from './theaters.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Theater])],
  providers: [TheatersService],
  controllers: [TheatersController],
  exports: [TheatersService],
})
export class TheatersModule {}
