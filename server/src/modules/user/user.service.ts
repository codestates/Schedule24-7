import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Schema as MongooseSchema } from "mongoose";

import { UserRepository } from "src/repositories/user.repository";
import { CreateUserDto } from "./dto/request/create-user.dto";
//import { UpdateUserDto } from "./dto/request/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(createUserDto: CreateUserDto) {
    // encode password
    const salt: string = await bcrypt.genSalt(10);
    const password: string = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = password;

    const createdUser = await this.userRepository.createUser(createUserDto);
    return createdUser;
  }

  async getUserInfo(id: string) {
    try {
      const user: any = await this.userRepository.getUserById(id);

      if (!user) {
        throw new NotFoundException(`Not Found`);
      }
      return user;
    } catch (err) {
      throw new InternalServerErrorException("Internal Server Error");
    }
  }

  async updatePassword(id: string, new_password: string) {
    // encode password
    const salt: string = await bcrypt.genSalt(10);
    const password: string = await bcrypt.hash(new_password, salt);
    return this.userRepository.updateUserPassword(id, password);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }

  async addGroupIdFromGroup(id: string, group: any) {
    const result: any = await this.userRepository.addGroupIdFromGroup(
      id,
      group,
    );
    return result;
  }
}
