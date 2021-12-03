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
    console.log(authNumberDto);
    try {
      await this.authService.checkAuthId(authNumberDto);
      return res.status(200).send();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get("/userId/:userId")
  async checkId(@Param("userId") userId: string, @Res() res: any) {
    try {
      const IdCheck: boolean = await this.authService.checkId(userId);
      return res.status(200).send({ result: IdCheck });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Get("/password/:password")
  async checkPass(
    @Headers("Authorization") authorization: string,
    @Param("password") password: string,
    @Res() res: any,
  ) {
    try {
      const passwordCheck: boolean = await this.authService.checkPass(
        password,
        authorization,
      );
      return res.status(200).send({ result: passwordCheck });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post("/loss/userid")
  checkUserIdLoss(
    @Body() authCheckUserIdLossDto: AuthCheckUserIdLossDto,
    @Res() res: any,
  ) {
    try {
      this.authService.checkUserIdLoss(authCheckUserIdLossDto);
      return res.status(200).send();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post("/loss/password")
  checkPasswordIdLoss(
    @Body() authCheckPasswordLossDto: AuthCheckPasswordLossDto,
    @Res() res: any,
  ) {
    try {
      this.authService.checkPasswordIdLoss(authCheckPasswordLossDto);
      return res.status(200).send();
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
