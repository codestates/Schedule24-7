import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  InternalServerErrorException,
  Header,
  Headers,
  Res,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCheckIdDto } from "./dto/auth-checkId.dto";
import { AuthCheckPassDto } from "./dto/auth-checkPass.dto";
import { AuthCheckPasswordLossDto } from "./dto/auth-checkPasswordLoss.dto";
import { AuthCheckUserIdLossDto } from "./dto/auth-checkUserIdLoss.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { AuthNumberDto } from "./dto/authNumber.dto";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/login")
  login(@Body() authLoginDto: AuthLoginDto) {
    try {
      return this.authService.login(authLoginDto);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get("/email/:email")
  async sendAuthMail(@Param("email") email: string) {
    return await this.authService.sendAuthMail(email);
  }

  @Post("authnumber")
  async checkAuthId(@Body() authNumberDto: AuthNumberDto, @Res() res: any) {
    try {
      await this.authService.checkAuthId(authNumberDto);
      return res.status(200).send();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get("/userId/:userId")
  async checkId(
    @Param("userId") authCheckIdDto: AuthCheckIdDto,
    @Res() res: any,
  ) {
    try {
      const IdCheck = await this.authService.checkId(authCheckIdDto);
      return res.status(200).send(IdCheck);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get("/password/:password")
  async checkPass(
    @Headers("Authorization") authorization: string,
    @Param("password") authCheckPassDto: AuthCheckPassDto,
    @Res() res: any,
  ) {
    try {
      const passwordCheck: boolean = await this.authService.checkPass(
        authCheckPassDto,
        authorization,
      );
      return res.status(200).send(passwordCheck);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post("/loss/userId")
  checkUserIdLoss(
    @Body() authCheckUserIdLossDto: AuthCheckUserIdLossDto,
    @Res() res: any,
  ) {
    this.authService.checkUserIdLoss(authCheckUserIdLossDto);
    return res.status(200).send();
  }

  @Post("/loss/password")
  checkPasswordIdLoss(
    @Body() authCheckPasswordLossDto: AuthCheckPasswordLossDto,
    @Res() res: any,
  ) {
    this.authService.checkPasswordIdLoss(authCheckPasswordLossDto);
    return res.status(200).send();
  }
}
