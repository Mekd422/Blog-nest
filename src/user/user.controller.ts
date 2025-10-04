import { CreateUserDto } from '@/user/dto/createUser.dto';
import { LoginDto } from '@/user/dto/loginUser.dto';
import { IUserResponse } from '@/user/types/UserResponse.Interface';
import { UserService } from '@/user/user.service';
import type { AuthRequest } from '@/types/expressRequest.interface';

import { Req } from "@nestjs/common";

import {
  Body,
  Controller,
  Post,
  Get,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UsePipes(new ValidationPipe())
  @Post("users")
  createUser(
    @Body('user') createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    return this.userService.createUser(createUserDto);
  }

  @Post('users/login')
  @UsePipes(new ValidationPipe())
  async loginUser(@Body('user') LoginDto: LoginDto): Promise<IUserResponse> {
    const user = await this.userService.LoginUser(LoginDto);
    return this.userService.generateUserResponse(user);
  }

  @Get('user')
  async getCurrentUser(@Req() request: AuthRequest): Promise<IUserResponse> {
    console.log(request.user);
    return this.userService.generateUserResponse(request.user);
  }
}
