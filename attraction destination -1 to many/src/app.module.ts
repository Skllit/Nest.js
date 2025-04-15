import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DestinationsModule } from './destinations/destinations.module';
import { AttractionsModule } from './attractions/attractions.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'curd',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Set to false in production
    }),
    DestinationsModule,
    AttractionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
