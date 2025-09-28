import { CreateUserDto } from '@/user/dto/createUser.dto';
import { IUserResponse } from '@/user/types/UserResponse.Interface';
import { UserEntity } from '@/user/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { sign } from 'jsonwebtoken';
import {compare} from 'bcrypt';
import * as dotenv from 'dotenv';
import { LoginDto } from '@/user/dto/loginUser.dto';
dotenv.config();

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

    const UserByEmail = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });

    const UserByUsername = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });

    if (UserByEmail || UserByUsername) {
      throw new HttpException('User already exists', 422);
    }

    const SavedUser = await this.userRepository.save(newUser);

    return this.generateUserResponse(SavedUser);
  }

  async LoginUser(LoginUserDto: LoginDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { email: LoginUserDto.email },
    });

    if (!user) {
      throw new HttpException(
        'Invalid credentials',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }

    const matchPassword = await compare(LoginUserDto.password, user.password );
    if (!matchPassword) {
      throw new HttpException(
        'wrong email or password',
        HttpStatus.UNAUTHORIZED,
      );
    }

    delete user.password;

    return user;
  }

  generateToken(user: UserEntity): string {
    const jwtSecret = process.env.JWT_SECRET_KEY;

    if (!jwtSecret) {
      throw new HttpException(
        'JWT_SECRET_KEY is not configured',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return sign(
      {
        id: user.id,
        username: user.username,
        email: user.email,
      },
      jwtSecret,
      { expiresIn: '1h' },
    );
  }

  generateUserResponse(user: UserEntity): IUserResponse {
    return {
      user: {
        ...user,
        token: this.generateToken(user),
      },
    };
  }
}
