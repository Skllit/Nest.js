import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Attraction } from './entities/attraction.entity';
import { AttractionsService } from './attractions.service';
import { AttractionsController } from './attractions.controller';
import { DestinationsModule } from '../destinations/destinations.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Attraction]),
    DestinationsModule,
  ],
  controllers: [AttractionsController],
  providers: [AttractionsService],
})
export class AttractionsModule {}
