import { Body, Controller, HttpException, Post } from '@nestjs/common';
import { UserDto } from './user.dto';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() userDto: UserDto): Promise<User> {
    let user = await this.userService.findOne(userDto.username);
    if (!user) throw new HttpException('User not registered.', 400);

    // login
    user = await this.userService.login(userDto.username, userDto.password);
    if (!user) throw new HttpException('Failed to login.', 400);
    return user;
  }

  @Post('signup')
  async signup(@Body() userDto: UserDto): Promise<User> {
    let user = await this.userService.findOne(userDto.username);
    if (user) throw new HttpException('User already registered.', 400);

    // signup.
    user = await this.userService.signup(userDto.username, userDto.password);
    if (!user) throw new HttpException('Failed to register.', 400);
    return user;
  }
}
