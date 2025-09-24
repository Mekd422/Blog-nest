import { CreateUserDto } from '@/user/createUser.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  createUser(createUserDto: CreateUserDto): CreateUserDto {
    return createUserDto;
  }
}
