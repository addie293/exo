import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'movies',
  database: 'movies',
})
export class Movie {
  @PrimaryGeneratedColumn()
  movieId: number;

  @CreateDateColumn()
  @UpdateDateColumn()
  timestamp: string;

  @Column()
  title: string;

  @Column()
  release_date: string;

  @Column()
  backdrop_path: string;

  @Column()
  overview: string;
}
