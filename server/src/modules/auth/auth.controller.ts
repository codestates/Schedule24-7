import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  Res,
  InternalServerErrorException,
  Query,
  Req,
} from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import {
  ApiBadRequestResponse,
  ApiConflictResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";
import { Request, Response } from "express";
import { Connection } from "mongoose";

import {
  BadRequestErr,
  ConflictErr,
  InternalSeverErr,
  UnauthorizeErr,
} from "src/commons/http-exception.dto";
import { AuthService } from "./auth.service";
import { AuthCheckPasswordLossDto } from "./dto/request/auth-checkPasswordLoss.dto";
import { AuthCheckUserIdLossDto } from "./dto/request/auth-checkUserIdLoss.dto";
import { AuthLoginDto } from "./dto/request/auth-login.dto";
import { AuthNumberDto } from "./dto/request/authNumber.dto";
import { AuthCheckIdResDto } from "./dto/response/auth-checkId.dto";
import { AuthCheckPassResDto } from "./dto/response/auth-checkPass.dto";
import { AuthCheckPasswordLossResDto } from "./dto/response/auth-checkPasswordLoss.dto";
import { AuthCheckUserIdLossResDto } from "./dto/response/auth-checkUserIdLoss.dto";
import { AuthGoogleLoginResDto } from "./dto/response/auth-googleToken.dto";
import { AuthKakaoLoginResDto } from "./dto/response/auth-kakaoToken.dto";
import { AuthLoginResDto } from "./dto/response/auth-login.dto";
import { AuthNumberResDto } from "./dto/response/auth-Number.dto";
import { AuthSendEmailResDto } from "./dto/response/auth-sendEmail.dto";

@Controller("auth")
@ApiTags("Auth API")
export class AuthController {
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private readonly authService: AuthService,
  ) {}

  // ! 로그인 진행
  @Post("/login")
  @ApiOperation({
    summary: "로그인-토큰발급",
    description:
      "유저 데이터를 바탕으로 로그인에 필요한 엑세스 토큰을 요청합니다.",
  })
  @ApiResponse({ status: 200, description: "Created", type: AuthLoginResDto })
  @ApiNotFoundResponse({ description: "Invalid username/password" })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async login(@Body() authLoginDto: AuthLoginDto): Promise<any> {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.authService.login(authLoginDto);
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      return err;
    } finally {
      session.endSession();
    }
  }

  // ! 최초 회원가입 시 인증메일 발송
  @Get("/email/:email")
  @ApiOperation({
    summary: "회원가입 시 이메일 인증번호 발송 요청",
    description: "전달된 이메일 주소로 인증번호 이메일 발송을 진행합니다.",
  })
  @ApiParam({
    name: "email",
    description: "인증번호가 발송될 이메일 값",
    required: true,
  })
  @ApiResponse({ status: 200, description: "OK", type: AuthSendEmailResDto })
  @ApiBadRequestResponse({ description: "Bad Request", type: BadRequestErr })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async sendAuthMail(@Param("email") email: string, @Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.authService.sendAuthMail(email);
      await session.commitTransaction();
      return res.status(200).send(result);
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send();
    } finally {
      session.endSession();
    }
  }

  // ! 입력된 인증번호 확인
  @Post("authnumber")
  @ApiOperation({
    summary: "인증번호 확인 요청",
    description:
      "인증번호와 인증세션의 id 값을 통해 사용자가 입력한 이메일 인증번호가 유효한지 체크합니다.",
  })
  @ApiResponse({ status: 200, description: "OK", type: AuthNumberResDto })
  @ApiBadRequestResponse({ description: "Bad Request", type: BadRequestErr })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async checkAuthId(@Body() authNumberDto: AuthNumberDto, @Res() res: any) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.authService.checkAuthId(authNumberDto);
      await session.commitTransaction();
      return res.status(200).send(result);
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      session.endSession();
    }
  }

  // ! 회원가입 시, 사용자 ID 중복 조회
  @Get("/userId/:userId")
  @ApiOperation({
    summary: "회원가입시 중복 ID확인",
    description: `회원 가잆에 필요한 ID 중복 확인 요청, 요청으로 전달된 id값이 DB에 존재하는 확인합니다. 
      중복 여부를 확인하여 중복되면 true, 중복되지 않으면 false 값을 반환합니다`,
  })
  @ApiParam({
    name: "userId",
    description: "중복확인이 필요한 userId값",
    required: true,
  })
  @ApiResponse({ status: 200, description: "OK", type: AuthCheckIdResDto })
  @ApiBadRequestResponse({ description: "Bad Request", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiConflictResponse({ description: "Conflict", type: ConflictErr })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async checkId(@Param("userId") userId: string, @Res() res: any) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result: boolean = await this.authService.checkId(userId);
      await session.commitTransaction();
      return res.status(200).send({ result });
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      session.endSession();
    }
  }

  // ! 마이페이지 비밀번호 확인
  @Get("/password/:password")
  @ApiOperation({
    summary: "회원가입시 중복 ID확인",
    description: `회원 가잆에 필요한 ID 중복 확인 요청, 요청으로 전달된 id값이 DB에 존재하는 확인합니다. 
      중복 여부를 확인하여 중복되면 true, 중복되지 않으면 false 값을 반환합니다`,
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer + 엑세스 토큰",
    required: true,
  })
  @ApiParam({
    name: "password",
    description: "일치 확인을 하고자 하는 password값",
    required: true,
  })
  @ApiResponse({ status: 200, description: "OK", type: AuthCheckPassResDto })
  @ApiBadRequestResponse({ description: "wrong password", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async checkPass(
    @Headers("Authorization") authorization: string,
    @Param("password") password: string,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result: boolean = await this.authService.checkPass(
        password,
        authorization,
      );
      await session.commitTransaction();
      return res.status(200).send({ result });
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      session.endSession();
    }
  }

  // ! 아이디 분실 시 아이디 이메일 발송 함수
  @Post("/loss/userid")
  @ApiOperation({
    summary: "유저 아이디 분실 관련 확인 목적 요청",
    description: `사용자가 유저아이디를 분실할 경우. 아이디값 확인을 위한 요청.
      필요한 정보를 통해서 검증된 이후 이메일이 발송됨.
      전달된 내용이 잘못된 경우에는 401 메시지를 전달한다.`,
  })
  @ApiResponse({
    status: 200,
    description: "OK",
    type: AuthCheckUserIdLossResDto,
  })
  @ApiBadRequestResponse({ description: "wrong password", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async checkUserIdLoss(
    @Body() authCheckUserIdLossDto: AuthCheckUserIdLossDto,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.authService.checkUserIdLoss(
        authCheckUserIdLossDto,
      );
      await session.commitTransaction();
      return res.status(200).send({ result });
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      session.endSession();
    }
  }

  // ! 비밀번호 분실 시 임시 비밀번호 이메일 발송 함수
  @Post("/loss/password")
  @ApiOperation({
    summary: "패스워드 분실관련 확인 목적 요청",
    description: `사용자가 패스워드를 분실할 경우. 임시비밀번호를 발급을 위한 요청.
      필요한 정보를 통해서 검증된 이후 이메일이 발송됨.
      전달된 내용이 잘못된 경우에는 401 메시지를 전달한다.`,
  })
  @ApiResponse({
    status: 200,
    description: "OK",
    type: AuthCheckPasswordLossResDto,
  })
  @ApiBadRequestResponse({ description: "wrong password", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async checkPasswordIdLoss(
    @Body() authCheckPasswordLossDto: AuthCheckPasswordLossDto,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.authService.checkPasswordIdLoss(
        authCheckPasswordLossDto,
      );
      await session.commitTransaction();
      return res.status(200).send({ result });
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      session.endSession();
    }
  }

  // ! 구글 Oauth
  @Get("/google")
  @ApiOperation({
    summary: "소셜 구글 계정 인증 요청",
    description: "구글 계정을 통해 인증 요청을 확인한다.",
  })
  @ApiNoContentResponse({
    description: "성공시 /auth/google/callback 리다이렉트된다.",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async googleAuth(@Res() res: Response) {
    const GOOGLE_AUTH_URL = "https://accounts.google.com/o/oauth2/v2/auth";
    const GOOGLE_AUTH_REDIRECT_URL =
      "https://server.schedule24-7.link/auth/google/callback";
    // const GOOGLE_AUTH_REDIRECT_URL =
    //   "https://localhost:8000/auth/google/callback";
    try {
      return res.redirect(
        `${GOOGLE_AUTH_URL}?client_id=${process.env.GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${GOOGLE_AUTH_REDIRECT_URL}&response_type=code&include_granted_scopes=true&scope=https://www.googleapis.com/auth/userinfo.email`,
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get("/google/callback")
  @ApiOperation({
    summary: "소셜 로그인/회원가입(구글) 콜백",
    description: `구글 계정을 정보를 통해 회원으로 가입된 상태면 로그인,
    미가입 상태면 회원가입을 한다.`,
  })
  @ApiQuery({
    name: "code",
    description: "구글에서 토큰 확인 후 주는 정보(이메일, 아이디)",
    required: true,
  })
  @ApiNoContentResponse({
    description: "성공시 메인페이지로 리다이렉트된다.",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async googleCallback(@Query("code") code: string, @Res() res: Response) {
    try {
      const accessToken = await this.authService.googleCallback(code);
      return (
        res
          .cookie("accessToken", accessToken, {
            domain: "schedule24-7.link",
            sameSite: true,
          })
          // .redirect("http://localhost:3000");
          .redirect("https://schedule24-7.link")
      );
    } catch (err) {
      return res.status(err.status).send(err);
    }
  }

  @Post("/google/check")
  @ApiOperation({
    summary: "쿠키로 온 액세스 토큰 바디로 응답",
    description: `소셜로그인을 통해 들어온 유저가 가진 쿠키의 액세스 토큰 데이터를 바디에 액세스 토큰으로 보내준다.`,
  })
  @ApiHeader({
    name: "cookies",
    description: "accessToken",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "성공시 메인페이지로 리다이렉트된다.",
    type: AuthGoogleLoginResDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async googleTokenCheck(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.authService.tokenCheck(req.cookies);
      return res.send(result);
    } catch (err) {
      return res.status(err.status).send(err);
    }
  }

  @Get("/kakao")
  @ApiOperation({
    summary: "소셜 카카오 계정 인증 요청",
    description: "카카오 계정을 통해 인증요청을 확인한다.",
  })
  @ApiNoContentResponse({
    description: "성공시 /auth/kakao/callback 리다이렉트된다.",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async kakaoAuth(@Res() res: Response) {
    const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth";
    const KAKAO_AUTH_REDIRECT_URL =
      "https://server.schedule24-7.link/auth/kakao/callback";
    // const KAKAO_AUTH_REDIRECT_URL = "http://localhost:8080/auth/kakao/callback";
    try {
      return res.redirect(
        `${KAKAO_AUTH_URL}/authorize?client_id=${process.env.KAKAO_AUTH_CLIENT_ID}&redirect_uri=${KAKAO_AUTH_REDIRECT_URL}&response_type=code`,
      );
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get("/kakao/callback")
  @ApiOperation({
    summary: "소셜 로그인/회원가입(카카오) 콜백",
    description: `카카오 계정의 정보를 통해 회원으로 가입된 상태면 로그인,
    미가입 상태면 회원가입을 한다.`,
  })
  @ApiQuery({
    name: "code",
    description: "카카오에서 토큰 확인 후 주는 정보(이메일, 아이디,닉네임)",
    required: true,
  })
  @ApiNoContentResponse({
    description: "성공시 메인페이지로 리다이렉트된다.",
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async kakaoCallback(@Query("code") code: string, @Res() res: Response) {
    try {
      const accessToken = await this.authService.kakaoCallback(code);
      return res
        .cookie("accessToken", accessToken, {
          domain: "schedule24-7.link",
          sameSite: true,
        })
        .redirect("https://schedule24-7.link");
    } catch (err) {
      return res.status(err.status).send(err);
    }
  }

  @Post("/kakao/check")
  @ApiOperation({
    summary: "쿠키로 온 액세스 토큰 바디로 응답",
    description: `소셜로그인을 통해 들어온 유저가 가진 쿠키의 액세스 토큰 데이터를 바디에 액세스 토큰으로 보내준다.`,
  })
  @ApiHeader({
    name: "cookies",
    description: "accessToken",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "성공시 메인페이지로 리다이렉트된다.",
    type: AuthKakaoLoginResDto,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async kakaoTokenCheck(@Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.authService.tokenCheck(req.cookies);
      return res.send(result);
    } catch (err) {
      return res.status(err.status).send(err);
    }
  }
}
