import { CreateUserDto } from '@/user/dto/createUser.dto';
import { LoginDto } from '@/user/dto/loginUser.dto';
import { IUserResponse } from '@/user/types/UserResponse.Interface';
import { UserService } from '@/user/user.service';
import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post()
  createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body('user') LoginDto: LoginDto): Promise<IUserResponse> {
    const user = await this.userService.LoginUser(LoginDto);
    return this.userService.generateUserResponse(user);
  }
}
