import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  findOne(username: string): Promise<User> {
    return this.usersRepo.findOne({ username: username });
  }

  login(username: string, password: string): Promise<User> {
    return this.usersRepo.findOne({
      username: username,
      password: password,
    });
  }

  signup(username: string, password: string): Promise<User> {
    const user = this.usersRepo.create({
      username: username,
      password: password,
    });
    return this.usersRepo.save(user);
  }
}
