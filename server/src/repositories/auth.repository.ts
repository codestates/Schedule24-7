import { MailerService } from "@nestjs-modules/mailer";
import { InternalServerErrorException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";

import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { nanoid } from "nanoid";
import HttpError from "src/commons/httpError";
import { ConfigService } from "src/config/config.service";
import { Auth } from "src/entities/auth.entity";
import { User } from "src/entities/user.entity";

export class AuthRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Auth.name) private readonly authModel: Model<Auth>,
    private readonly jwtService: JwtService,
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  // * 사용자 ID 기준으로 유저 정보 조회
  async getUserByUserId(userId: string) {
    try {
      const user = await this.userModel.findOne({ userId });
      return user;
    } catch (err) {
      throw new HttpError(400, "userId의 값이 올바르지 않습니다");
    }
  }

  async getUserByObjectId(_id: string): Promise<User & { _id: any }> {
    try {
      const user = await this.userModel.findById(_id);
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // * 인증 번호 생성 함수
  generateAuthNumber(min: number, max: number): number {
    const authNumber: number = Math.round(Math.random() * (max - min) + min);
    return authNumber;
  }

  // * 토큰 생성 함수
  generateToken(userInfo: User): { accessToken: string } {
    const payload: { [_id: string]: string } = { _id: userInfo._id.toString() };
    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: "1d",
    });

    return { accessToken };
  }

  /**
   * * 토큰 검증 함수
   * @param authorization : "Authorization" 헤더 내용 전체
   * @returns 토큰 내 데이터 ObjectId
   */
  validateToken(authorization: string): {} {
    const accessToken: string = authorization.split(" ")[1];
    const tokenData: {} = this.jwtService.verify(accessToken);
    return tokenData;
  }

  // * 인증 메일 발송 함수
  sendAuthMail(email: string, authNumber: number) {
    return this.mailerService
      .sendMail({
        to: email,
        subject: "Testing",
        html: `<p>아래 4자리 인증번호를 입력해주세요</p>
        <h1>${authNumber}</h1>`,
      })
      .then(() => {
        return authNumber;
      })
      .catch((err) => {
        throw new InternalServerErrorException(err);
      });
  }

  // * auth 컬렉션 도큐먼트 생성 함수
  async createAuth(authNumber: number) {
    return await this.authModel.create({ authNumber });
  }

  // * ObjectId로 auth 컬렉션 데이터 조회
  async getAuthByObjectId(_id: string) {
    try {
      return await this.authModel.findOne({ _id });
    } catch (err) {
      throw new HttpError(400, "전달된 _id가 올바르지 않습니다");
    }
  }

  // * ObjectId로 auth 컬렉션 데이터 삭제
  async deleteAuthByObjectId(_id: string) {
    return await this.authModel.findByIdAndDelete(_id);
  }

  // * ID 메일 발송 함수
  async sendIdMail(email: string, userId: string, userName: string) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: "Testing",
        html: `<p>${userName}님의 아이디는 다음과 같습니다.</p>
        <h1>${userId}</h1>`,
      });
      return true;
    } catch (err) {
      return false;
    }
  }
  // * 임시 비밀번호 메일 발송 함수
  async sendPasswordMail(
    email: string,
    userId: string,
    temporaryPassword: string,
  ) {
    try {
      await this.mailerService.sendMail({
        to: email,
        subject: "Testing",
        html: `<p>${userId}님의 임시비밀번호는 다음과 같습니다.</p>
        <h1>${temporaryPassword}</h1>`,
      });
      return true;
    } catch (err) {
      return false;
    }
  }

  // * 임시 비밀번호 생성 함수
  generateTemporaryPassword(): string {
    return nanoid(10);
  }
}
