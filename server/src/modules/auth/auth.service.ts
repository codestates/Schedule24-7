import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";

import { AuthRepository } from "../../repositories/auth.repository";
import { UserRepository } from "src/repositories/user.repository";
import { AuthLoginDto } from "./dto/request/auth-login.dto";
import { AuthNumberDto } from "./dto/request/authNumber.dto";
import { AuthCheckUserIdLossDto } from "./dto/request/auth-checkUserIdLoss.dto";
import { AuthCheckPasswordLossDto } from "./dto/request/auth-checkPasswordLoss.dto";
import HttpError from "src/commons/httpError";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
  ) {}

  /**
   * * 로그인 진행 함수
   * * POST auth/login
   * @param authLoginDto : {userId: string, password: string}
   * @returns Promise<{accessToken: string}>
   */
  async login(authLoginDto: AuthLoginDto): Promise<{ accessToken: string }> {
    const userInfo = await this.userRepository.getUserByUserId(
      authLoginDto.userId,
    );
    // 사용자 정보 확인하여 전달된 userId 검증
    if (!userInfo) {
      throw new HttpError(401, "userId와 일치하는 계정이 존재하지 않습니다");
    }
    // 패스워드 일치여부 확인
    const passwordCheck = await bcrypt.compare(
      authLoginDto.password,
      userInfo.password,
    );
    // 패스워드 불일치 경우
    if (!passwordCheck) {
      throw new HttpError(401, "password가 일치하지 않습니다");
    }
    // 엑세스 토큰 생성 및 전달
    const accessToken = this.authRepository.generateToken(userInfo);
    return accessToken;
  }

  /**
   * * 마이페이지 비민번호 확인 로직
   * * GET /password/:password
   * 토큰 정보 검증 후,
   * 토큰 정보 기반 DB에서 유저 정보 조회
   * 조회한 유저 정보의 비밀번호와 전달된 비밀번호 비교
   * 일치 true 값, 불일치시 false 값 반환
   *
   * @param password
   * @param authorization
   * @returns
   */
  async checkPass(password: string, authorization: string) {
    // * authorization 토큰 데이터 조회
    const tokenData: any = this.authRepository.validateToken(authorization);
    if (!tokenData) {
      throw new HttpError(401, "토큰 값이 유효하지 않습니다.");
    }
    // * 토큰 정보 기반 DB 유저 정보 조회
    const userInfo = await this.authRepository.getUserByObjectId(tokenData._id);
    if (!userInfo) {
      throw new HttpError(401, "토큰 값이 유효하지 않습니다.");
    }
    // * 가져온 user 정보로 DB 상의 비밀번호와 비교
    const passwordCheck = await bcrypt.compare(password, userInfo.password);
    return passwordCheck;
  }

  /**
   * * userId 중복 확인
   * * GET /userId/:userId
   * userDB에서 기존 유저 정보 존재 여부 확인
   * @param userId: string
   * @returns
   */
  async checkId(userId: string) {
    // * 전달된 userId를 통해 DB에서 유저 정보 조회
    const userInfo = await this.authRepository.getUserByUserId(userId);

    // * 유저 정보 조회 결과 존재 여부에 따른 결과 Boolean 값 전달
    // user 정보 기존 존재 시, true
    // user 정보 기존 존재하지 않을 시, false
    if (!userInfo) {
      return false;
    } else {
      return true;
    }
  }

  /**
   * * 이메일 발송 로직
   * * GET /auth/email/:email
   * 기존 DB 상에 이메일 존재 여부 검토 후,
   * 인증메일 발송
   * @param email : string
   * @returns Promise<{ message: string; _id: string }>
   */
  async sendAuthMail(email: string): Promise<{ message: string; _id: string }> {
    // * 전달된 이메일 주소 값 DB조회 및 중복 확인 로직
    const userInfo = await this.userRepository.getUserByEmail(email);
    if (!!userInfo) {
      throw new HttpError(400, "이미 존재하는 이메일 주소 입니다");
    }

    // * authNumber: 인증번호 생성
    const authNumber: number = this.authRepository.generateAuthNumber(
      1111,
      9999,
    );

    // * 인증번호 메일 발송 로직
    await this.authRepository.sendAuthMail(email, authNumber);

    // * 인증번호 authDB 저장 로직
    const data = await this.authRepository.createAuth(authNumber);
    const _id: string = data._id.toString();

    // * 5분 뒤 인증정보 데이터베이스 삭제
    setTimeout(
      () => this.authRepository.deleteAuthByObjectId(_id),
      1000 * 60 * 5,
    );
    return {
      message: "이메일이 발송되었습니다",
      _id,
    };
  }

  /**
   * * 인증번호 이메일 확인 로직
   * * POST /auth/authnumber
   * @param authNumberDto {_id: string, authNumber: number}
   * @returns : Promise<void>
   */
  async checkAuthId(authNumberDto: AuthNumberDto) {
    // * 전달된 오브젝트 ID로 Auth DB 조회
    const auth = await this.authRepository.getAuthByObjectId(authNumberDto._id);
    if (!auth) {
      throw new HttpError(401, "전달된 _id 값이 올바르지 않습니다");
    }

    // * 전달된 인증번호의 값이 일치하는지 검토
    if (auth.authNumber !== authNumberDto.authNumber) {
      throw new HttpError(400, "전달된 authNumber가 일치하지 않습니다.");
    }

    // * Auth DB 상의 인증번호 도큐먼트 삭제
    await this.authRepository.deleteAuthByObjectId(authNumberDto._id);
    const success = { message: "인증이 완료되었습니다" };
    return success;
  }

  /**
   * * userId 분실 시, userId 조회 및 이메일 발송 로직
   * * POST /loss/userid
   * 전달된 email, userName DB 상에서 조회 후,
   * 정상 조회 시, userId 입력해준 이메일을 통해서 발송됨
   * 이메일 정상 발송 여부 string으로 출력
   *
   * @param authCheckUserIdLossDto : {email: string, userName: string}
   * @returns Promise<string>
   */
  async checkUserIdLoss(
    authCheckUserIdLossDto: AuthCheckUserIdLossDto,
  ): Promise<string> {
    //* 전달된 email, userName 검증 로직
    const userInfo = await this.userRepository.getUserByEmail(
      authCheckUserIdLossDto.email,
    );
    if (!userInfo) {
      throw new HttpError(401, "전달된 email 값이 올바르지 않습니다");
    }

    if (userInfo.userName !== authCheckUserIdLossDto.userName) {
      throw new HttpError(401, "전달된 userName 값이 올바르지 않습니다.");
    }

    //* userId 정보 발송 메일
    const isSend: boolean = await this.authRepository.sendIdMail(
      authCheckUserIdLossDto.email,
      userInfo.userId,
      authCheckUserIdLossDto.userName,
    );

    if (!isSend) {
      throw new HttpError(500, "이메일이 정상적으로 발송되지 않았습니다.");
    } else {
      return "이메일이 정상적으로 발송되었습니다.";
    }
  }

  /**
   * * 비밀번호 분실 시 임시 비밀번호 이메일 발송 로직
   * * POST /loss/password
   * 전달된 userId, userName, email 값 DB 상의 값과 대조
   * 임시 비밀번호 생성 및 암호화 후 DB 저장
   * 임시 비밀번호 이메일 통해 발송
   * 이메일 정상 발송 여부 string으로 출력
   *
   * @param authCheckPasswordLossDto : {userName: string, userId: string, email: string}
   * @returns: Promise<string>
   */
  async checkPasswordIdLoss(
    authCheckPasswordLossDto: AuthCheckPasswordLossDto,
  ): Promise<string> {
    //* 전달된 userId 기반 DB user 정보 조회
    const userInfo = await this.userRepository.getUserByUserId(
      authCheckPasswordLossDto.userId,
    );
    // * userId, userName, email 정보 일치 여부 확인
    if (!userInfo) throw new HttpError(401, "userId 값이 올바르지 않습니다.");

    if (authCheckPasswordLossDto.userName !== userInfo.userName)
      throw new HttpError(401, "userName 값이 올바르지 않습니다.");

    if (authCheckPasswordLossDto.email !== userInfo.email)
      throw new HttpError(401, "email 값이 올바르지 않습니다.");

    // * 임시비밀번호 생성
    const salt: string = await bcrypt.genSalt(10);
    const temporaryPassword: string =
      this.authRepository.generateTemporaryPassword();
    const hashedPassword: string = await bcrypt.hash(temporaryPassword, salt);

    // * 임시 비밀번호 DB상 업데이트 진행
    await this.userRepository.updateUserPassword(userInfo._id, hashedPassword);

    // * 임시 비밀번호 이메일 발송 진행
    const isSend: boolean = await this.authRepository.sendPasswordMail(
      authCheckPasswordLossDto.email,
      authCheckPasswordLossDto.userId,
      temporaryPassword,
    );

    if (!isSend) {
      throw new HttpError(500, "이메일이 정상적으로 발송되지 않았습니다.");
    } else {
      return "이메일이 정상적으로 발송되었습니다.";
    }
  }

  async googleCallback(code: string) {
    const GOOGLE_AUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
    const GOOGLE_AUTH_REDIRECT_URL =
      "http://server.schedule24-7.link/auth/google/callback";

    const { data }: any = await lastValueFrom(
      this.httpService.request({
        method: "POST",
        url: `${GOOGLE_AUTH_TOKEN_URL}`,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
        params: {
          grant_type: "authorization_code",
          client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
          client_secret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
          redirect_uri: GOOGLE_AUTH_REDIRECT_URL,
          code: code,
        },
      }),
    );
    const access_token = data.access_token;
    const { data: snsData }: any = await lastValueFrom(
      this.httpService.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`,
      ),
    );

    const parseName = snsData.email.split("@")[0];
    const tempPassword = this.authRepository.generateTemporaryPassword();

    const userInfo = {
      email: snsData.email,
      userId: snsData.sub,
      userName: parseName,
      password: tempPassword,
      tokenType: "google",
    };

    const isExist = await this.userRepository.getUserByUserId(userInfo.userId);

    let accessToken;
    if (isExist) {
      accessToken = this.authRepository.generateToken(isExist);
    } else {
      const signUpGoogle = await this.userRepository.createUser(userInfo);
      accessToken = this.authRepository.generateToken(signUpGoogle);
    }
    return accessToken;
  }
}
