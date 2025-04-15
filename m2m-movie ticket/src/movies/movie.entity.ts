import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm';
import { Theater } from '../theaters/theater.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  duration: number; // minutes

  @ManyToMany(() => Theater, theater => theater.movies, { cascade: true })
  @JoinTable()
  theaters: Theater[];
}
