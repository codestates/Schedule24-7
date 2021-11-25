import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";

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
    const userExists: any = await this.getUserByEmail(createUserDto.email);

    if (userExists.length === 0) {
      const newUser = new this.userModel({
        name: createUserDto.name,
        email: createUserDto.email,
        role: createUserDto.role,
      });

      try {
        const createdUser = await newUser.save();
        return createdUser;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    } else {
      throw new ConflictException("이미 존재하는 유저입니다.");
    }
  }

  async getUserById(id: MongooseSchema.Types.ObjectId) {
    try {
      const user = await this.userModel.findById(id);
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async getUserByEmail(email: string) {
    try {
      const user = await this.userModel
        .find({ email }, "name email role")
        .exec();
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
