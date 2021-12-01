import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthRepository } from "../../repositories/auth.repository";
import { JwtService } from "@nestjs/jwt";
import { AuthLoginDto } from "./dto/auth-login.dto";
import * as bcrypt from "bcrypt";
import { AuthCheckPassDto } from "./dto/auth-checkPass.dto";
import { AuthCheckIdDto } from "./dto/auth-checkId.dto";
import { boolean } from "joi";
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const userInfo = await this.authRepository.getUserByUserId(
      authLoginDto.userId,
    );
    // 사용자 정보 확인하여 전달된 userId 검증
    if (!userInfo) {
      throw new UnauthorizedException("존재하지 않는 userId 입니다.");
    }
    // 패스워드 일치여부 확인
    const passwordCheck = bcrypt.compare(
      authLoginDto.password,
      userInfo.password,
    );
    // 패스워드 불일치 경우
    if (!passwordCheck) {
      throw new UnauthorizedException("password가 일치하지 않습니다");
    }

    // 토큰 발급을 위한 정보 구성
    const payload: { [_id: string]: string } = { _id: userInfo._id.toString() };
    // 토큰 생성
    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: "1d",
    });

    return { accessToken };
  }

  async checkPass(authCheckPassDto: AuthCheckPassDto, tokenData: any) {
    try {
      const userInfo = await this.authRepository.getUserByObjectId(
        tokenData._id,
      );
      if (!userInfo) {
        throw new UnauthorizedException("토큰 값이 유효하지 않습니다.");
      }
      const passwordCheck = await bcrypt.compare(
        authCheckPassDto.password,
        userInfo.password,
      );
      return passwordCheck;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  async checkId(authCheckIdDto: AuthCheckIdDto) {
    try {
      const userInfo = await this.authRepository.getUserByUserId(
        authCheckIdDto.userId,
      );
      if (!userInfo) {
        return { message: `존재하지 않는 userId 입니다.` };
      } else {
        return { message: `존재하는 userId 입니다.` };
      }
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  validateToken(authorization: string) {
    const accessToken: string = authorization.split(" ")[1];
    const tokenData: {} = this.jwtService.verify(accessToken);
    return tokenData;
  }
  checkToken(accessToken: string) {
    const result = this.jwtService.decode(accessToken);
    return result;
  }
}
