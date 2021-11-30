import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  ConflictException,
  InternalServerErrorException,
} from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../modules/user/dto/create-user.dto";

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const isUser: any = await this.getUserByUserId(createUserDto.userId);
    const isEmail: any = await this.getUserByEmail(createUserDto.email);

    if (isUser.length === 0 && isEmail.length === 0) {
      const newUser = new this.userModel({
        userId: createUserDto.userId,
        email: createUserDto.email,
        password: createUserDto.password,
      });

      try {
        const createdUser = await newUser.save();
        return createdUser;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    } else if (isUser.length > 0) {
      throw new ConflictException("이미 존재하는 유저입니다.");
    } else {
      throw new ConflictException("이미 존재하는 이메일입니다.");
    }
  }

  async getUserByUserId(userId: string) {
    try {
      const user = await this.userModel.find({ userId });
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async getUserByEmail(email: string) {
    try {
      const user = await this.userModel.find({ email }).exec();
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
