import { CreateUserDto } from '@/user/createUser.dto';
import { UserService } from '@/user/user.service';
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(@Body('user') createUserDto: CreateUserDto): any {
    return this.userService.createUser(createUserDto);
  }
}
