import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Headers,
  Res,
} from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { AuthService } from "./auth.service";
import { AuthCheckPasswordLossDto } from "./dto/auth-checkPasswordLoss.dto";
import { AuthCheckUserIdLossDto } from "./dto/auth-checkUserIdLoss.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthNumberDto } from "./dto/authNumber.dto";

@Controller("auth")
export class AuthController {
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private readonly authService: AuthService,
  ) {}

  // ! 로그인 진행
  @Post("/login")
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
  async sendAuthMail(@Param("email") email: string) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.authService.sendAuthMail(email);
      await session.commitTransaction();
      return result;
    } catch (err) {
      await session.abortTransaction();
      return err;
    } finally {
      session.endSession();
    }
  }

  // ! 입력된 인증번호 확인
  @Post("authnumber")
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
}
