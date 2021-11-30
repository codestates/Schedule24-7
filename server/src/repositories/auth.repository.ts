import {
  HttpCode,
  InternalServerErrorException,
  NotAcceptableException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/entities/user.entity";
import { AuthLoginDto } from "src/modules/auth/dto/auth-login.dto";

export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const userInfo = await this.getUserByUserId(authLoginDto.userId);
    console.log(userInfo);

    if (!userInfo) {
      return new UnauthorizedException(
        "Id에 해당되는 유저가 존재하지 않습니다",
      );
    }

    if (authLoginDto.password !== userInfo.password) {
      return new UnauthorizedException("비밀번호가 일치하지 않습니다.");
    }

    return "Success";
  }

  // 사용자 ID 기준으로 유저 정보 조회
  async getUserByUserId(userId: string) {
    try {
      const user = await this.userModel.findOne({ userId });
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
