import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Destination } from '../../destinations/entities/destination.entity';

@Entity()
export class Attraction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @Column({ nullable: true })
  openingHours: string;

  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ManyToOne(() => Destination, destination => destination.attractions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'destinationId' })
  destination: Destination;

  @Column()
  destinationId: number;
}
