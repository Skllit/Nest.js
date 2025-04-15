import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesModule } from './movies/movies.module';
import { TheatersModule } from './theaters/theaters.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',         
      password: 'pass@word1',  
      database: 'crud', 
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,         
    }),
    MoviesModule,
    TheatersModule,
  ],
})
export class AppModule {}
