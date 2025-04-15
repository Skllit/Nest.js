import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Projectinfo } from './projectinfo/entities/projectinfo.entity';
import { ProjectinfoModule } from './projectinfo/projectinfo.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'pass@word1',
    database: 'curd',
    entities: [Projectinfo],
    synchronize: true,
  }),
  ProjectinfoModule,
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
