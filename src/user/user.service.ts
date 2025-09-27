import { CreateUserDto } from '@/user/createUser.dto';
import { IUserResponse } from '@/user/types/UserResponse.Interface';
import { UserEntity } from '@/user/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {sign} from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async createUser(createUserDto: CreateUserDto): Promise<IUserResponse> {
    console.log('Received DTO:', createUserDto);
    const newUser = new UserEntity();
    Object.assign(newUser, createUserDto);

    const SavedUser = await this.userRepository.save(newUser);

    return this.generateUserResponse(SavedUser);
  }

  generateToken(user: UserEntity) : String{
    return sign({
      id: user.id,
      username: user.username,
      email: user.email
    },
    process.env.JWT_SECRET_KEY,
  )
  }

  generateUserResponse(user: UserEntity) : IUserResponse {
    return {
      user:{
        ...user,
        token: this.generateToken(user)
      }
    }
  }
}
