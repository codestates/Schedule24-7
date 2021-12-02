import {
  HttpCode,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
} from "@nestjs/common";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/entities/user.entity";
import { AuthLoginDto } from "src/modules/auth/dto/auth-login.dto";

export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  // 사용자 ID 기준으로 유저 정보 조회
  async getUserByUserId(userId: string) {
    try {
      const user = await this.userModel.findOne({ userId });
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  async getUserByObjectId(_id: string) {
    try {
      const user = await this.userModel.findById(_id);
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  generateNumber(min: number, max: number): number {
    const number: number = Math.round(Math.random() * (max - min) + min);
    return number;
  }
}
