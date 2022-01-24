import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'favorites',
  database: 'movies',
})
export class Favorite {
  @PrimaryGeneratedColumn()
  favoriteId: number;

  @CreateDateColumn()
  @UpdateDateColumn()
  timestamp: string;

  @Column()
  movieId: number;

  @Column()
  userId: number;
}
