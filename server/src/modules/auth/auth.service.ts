import {
  BadRequestException,
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
import { MailerService } from "@nestjs-modules/mailer";
import { UserRepository } from "src/repositories/user.repository";
import { AuthNumberDto } from "./dto/authNumber.dto";
import { AuthCheckUserIdLossDto } from "./dto/auth-checkUserIdLoss.dto";
import { AuthCheckPasswordLossDto } from "./dto/auth-checkPasswordLoss.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const userInfo = await this.userRepository.getUserByUserId(
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

    const accessToken = this.authRepository.generateToken(userInfo);

    return { accessToken };
  }

  async checkPass(authCheckPassDto: AuthCheckPassDto, authorization: string) {
    try {
      const tokenData: any = this.authRepository.validateToken(authorization);
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

  async sendAuthMail(email: string): Promise<any> {
    const authNumber: number = this.authRepository.generateAuthNumber(
      1111,
      9999,
    );
    await this.authRepository.sendAuthMail(email, authNumber);
    const data = await this.authRepository.createAuth(authNumber);
    const _id: string = data._id.toString();

    // 5분 뒤 인증정보 데이터베이스 삭제
    setTimeout(
      () => this.authRepository.deleteAuthByObjectId(_id),
      1000 * 60 * 5,
    );
    return {
      message: "email was sent",
      _id,
    };
  }

  async checkAuthId(authNumberDto: AuthNumberDto) {
    const auth = await this.authRepository.getAuthByObjectId(authNumberDto._id);
    if (!auth) {
      throw new UnauthorizedException();
    }

    if (auth.authNumber !== authNumberDto.authNumber) {
      throw new BadRequestException();
    }
    await this.authRepository.deleteAuthByObjectId(authNumberDto._id);
    return;
  }

  async checkUserIdLoss(authCheckUserIdLossDto: AuthCheckUserIdLossDto) {
    const userInfo = await this.userRepository.getUserByEmail(
      authCheckUserIdLossDto.email,
    );
    if (!userInfo) {
      throw new UnauthorizedException();
    }

    if (userInfo.username !== authCheckUserIdLossDto.userName) {
      throw new UnauthorizedException();
    }

    return await this.authRepository.sendIdMail(
      authCheckUserIdLossDto.email,
      userInfo.userId,
      authCheckUserIdLossDto.userName,
    );
  }

  async checkPasswordIdLoss(
    authCheckPasswordLossDto: AuthCheckPasswordLossDto,
  ) {
    const userInfo = await this.userRepository.getUserByUserId(
      authCheckPasswordLossDto.userId,
    );
    if (!userInfo) {
      throw new UnauthorizedException();
    }
    if (
      authCheckPasswordLossDto.userName !== userInfo.userName ||
      authCheckPasswordLossDto.email !== userInfo.email
    ) {
      throw new UnauthorizedException();
    }
    const salt: string = await bcrypt.genSalt(10);
    const temporaryPassword: string = await bcrypt.hash(
      this.authRepository.generateTemporaryPassword(),
      salt,
    );
    await this.userRepository.updateUserPassword(
      authCheckPasswordLossDto.userId,
      temporaryPassword,
    );

    const result: boolean = await this.authRepository.sendPasswordMail(
      authCheckPasswordLossDto.email,
      authCheckPasswordLossDto.userId,
      temporaryPassword,
    );

    if (result) {
      return;
    } else {
      throw new InternalServerErrorException();
    }
  }

  //! 아래 삭제 예정 함수

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
