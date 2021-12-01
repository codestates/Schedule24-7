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
import { AuthLoginDto } from "./dto/auth-login.dto";

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

  @Post("/checkpass")
  async checkPass(
    @Headers("Authorization") authorization: string,
    @Body() authCheckPassDto: AuthCheckPassDto,
    @Res() res: any,
  ) {
    try {
      const tokenData: {} = this.authService.validateToken(authorization);
      const passwordCheck: boolean = await this.authService.checkPass(
        authCheckPassDto,
        tokenData,
      );
      return res.status(200).send(passwordCheck);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  @Post("/checkid")
  async checkId(@Body() authCheckIdDto: AuthCheckIdDto, @Res() res: any) {
    try {
      const IdCheck = await this.authService.checkId(authCheckIdDto);
      return res.status(200).send(IdCheck);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
}
