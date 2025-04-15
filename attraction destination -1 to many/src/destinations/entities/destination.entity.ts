import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Attraction } from '../../attractions/entities/attraction.entity';

@Entity()
export class Destination {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  country: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @OneToMany(() => Attraction, attraction => attraction.destination, {
    cascade: true,
  })
  attractions: Attraction[];
}
