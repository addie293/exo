import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
  database: 'movies',
})
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @CreateDateColumn()
  @UpdateDateColumn()
  timestamp: string;

  @Column()
  username: string;

  @Column()
  password: string;
}
