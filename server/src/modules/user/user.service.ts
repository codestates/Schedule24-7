import { Injectable, UnauthorizedException } from "@nestjs/common";
import { Schema as MongooseSchema } from "mongoose";

import { UserRepository } from "src/repositories/user.repository";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    const createdUser = await this.userRepository.createUser(createUserDto);
    return createdUser;
  }

  async getUserFindById(id: MongooseSchema.Types.ObjectId) {
    const user = await this.userRepository.getUserById(id);

    if (!user) {
      throw new UnauthorizedException(`해당하는 ID(${id})의 정보가 없습니다.`);
    }
    return user;
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
