import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../modules/user/dto/request/create-user.dto";

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  // 회원생성
  async createUser(createUserDto: CreateUserDto) {
    // 동일한 유저아이디가 있는지 확인
    const isUser: any = await this.getUserByUserId(createUserDto.userId);
    // 동일한 이메일이 있는지 확인
    const isEmail: any = await this.getUserByEmail(createUserDto.email);
    // 동일한 정보가 없는 경우 정보 등록
    if (isUser.length === 0 && isEmail.length === 0) {
      const newUser: any = new this.userModel({
        userId: createUserDto.userId,
        email: createUserDto.email,
        password: createUserDto.password,
      });

      try {
        const createdUser: any = await newUser.save();
        return createdUser;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
      // 유저가 존재하거나
    } else if (isUser.length > 0) {
      throw new ConflictException("이미 존재하는 유저입니다.");
    } else {
      // 이메일이 존재하거나
      throw new ConflictException("이미 존재하는 이메일입니다.");
    }
  }
  // 동일한 유저 아이디가 있는지
  async getUserByUserId(userId: string) {
    try {
      const user: any = await this.userModel.find({ userId });
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  // 동일한 이메일이 있는지 확인
  async getUserByEmail(email: string) {
    try {
      const user: any = await this.userModel.find({ email }).exec();
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  // 동일한 아이디가 있는지 확인
  async getUserById(id: string) {
    try {
      const user: any = await this.userModel.findById(id).select("-password");
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  // 비밀 번호 수정
  async updateUserPassword(id: string, new_password: string) {
    try {
      return await this.userModel.findByIdAndUpdate(id, {
        $set: { password: new_password },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  // 회원탈퇴
  async remove(id: string) {
    try {
      await this.userModel.remove({ _id: id });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
}
