// src/app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from './authors/authors.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',            // update with your MySQL username
      password: 'pass@word1',    // update with your MySQL password
      database: 'crud',            // create this database in MySQL
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,           // For development only
    }),
    AuthorsModule,
    PostsModule,
  ],
})
export class AppModule {}
