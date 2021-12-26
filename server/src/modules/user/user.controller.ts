import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Delete,
  Res,
} from "@nestjs/common";
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiBadRequestResponse,
  ApiUnauthorizedResponse,
  ApiNotFoundResponse,
  ApiHeader,
  ApiNoContentResponse,
  ApiBearerAuth,
  ApiResponse,
} from "@nestjs/swagger";

import {
  BadRequestErr,
  ConflictErr,
  InternalSeverErr,
  NotFoundErr,
  UnauthorizeErr,
} from "src/commons/http-exception.dto";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/request/create-user.dto";
import { CreateUserResDto } from "./dto/response/create-user.dto";
import { GetUserInfoResDto } from "./dto/response/select-user.dto";
import { UpdateUserResDto } from "./dto/response/update-user.dto";
import { Connection } from "mongoose";
import { Response } from "express";
import { InjectConnection } from "@nestjs/mongoose";
import HttpError from "src/commons/httpError";
import { CreateGuestResDto } from "./dto/response/create-guest.dto";
import { DeleteGuestResDto } from "./dto/response/delete-guest.dto";
import { UpdateUserDto } from "./dto/request/update-user.dto";

@Controller("users")
@ApiTags("User API")
export class UserController {
  constructor(
    private readonly userService: UserService,
    @InjectConnection()
    private readonly mongoConnection: Connection,
  ) {}

  @Post()
  @ApiOperation({ summary: "신규 회원가입", description: "회원 가입" })
  @ApiCreatedResponse({ description: "created", type: CreateUserResDto })
  @ApiConflictResponse({
    description: "동일한 유저 아이디 및 이메일이 존재합니다.",
    type: ConflictErr,
  })
  @ApiInternalServerErrorResponse({
    description: "서버에러",
    type: InternalSeverErr,
  })
  async create(@Body() createUserDto: CreateUserDto) {
    const newUser: any = await this.userService.createUser(createUserDto);
    if (newUser)
      return {
        status: 201,
        message: "Created",
      };
    else return { status: 500, message: "Not Created" };
  }

  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: "유저 관련 데이터 조회 API",
    description: "유저정보 조회",
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer + 엑세스 토큰",
    required: true,
  })
  @ApiOkResponse({
    description: "아이디가 일치하는 유저 정보를 조회한다.",
    type: GetUserInfoResDto,
  })
  @ApiBadRequestResponse({
    description: "잘못된 요청입니다.",
    type: BadRequestErr,
  })
  @ApiUnauthorizedResponse({
    description: "유효하지 않은 토큰입니다.",
    type: UnauthorizeErr,
  })
  @ApiNotFoundResponse({
    description: "정보를 조회할수 없습니다.",
    type: NotFoundErr,
  })
  @ApiInternalServerErrorResponse({
    description: "서버에러",
    type: InternalSeverErr,
  })
  async getUserInfoAll(@Headers("Authorization") authorization: string) {
    if (!authorization) throw new HttpError(400, "Bad Request");
    const user: any = await this.userService.getUserInfoAll(authorization);
    return {
      status: 200,
      message: "OK",
      user,
    };
  }

  @ApiBearerAuth()
  @Patch()
  @ApiOperation({ summary: "비밀번호 변경 API" })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer + 엑세스 토큰",
    required: true,
  })
  @ApiOkResponse({
    description: "아이디가 일치하는 유저 정보를 수정한다.",
    type: UpdateUserResDto,
  })
  async updatePassword(
    @Headers("Authorization") authorization: string,
    @Body() dto: UpdateUserDto,
  ) {
    if (!authorization || !Object.keys(dto).length)
      throw new HttpError(400, "Bad Request");

    const { new_password } = dto;

    await this.userService.updatePassword(authorization, new_password);
    return {
      status: 200,
      message: "OK",
    };
  }

  @ApiBearerAuth()
  @Delete()
  @ApiOperation({ summary: "회원 탈퇴 API" })
  @ApiNoContentResponse({
    description: "아이디가 일치하는 유저 정보를 삭제한다.",
  })
  async signOut(@Headers("Authorization") authorization: string) {
    if (!authorization) throw new HttpError(400, "Bad Request");
    await this.userService.signOut(authorization);
    return {
      status: 200,
      message: "OK",
    };
  }

  // ! 게스트 계정 생성
  @Get("/guest")
  @ApiOperation({
    summary: "게스트 계정 생성",
    description: "사이트 체험을 하기 위한 게스트 계정을 생성한다.",
  })
  @ApiCreatedResponse({
    type: CreateGuestResDto,
  })
  @ApiInternalServerErrorResponse({
    description: "서버에러",
    type: InternalSeverErr,
  })
  async createGuest(@Res() res: Response) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      const accessToken = await this.userService.createGuest();
      const result = Object.assign({}, accessToken, { test: true });
      session.commitTransaction();
      return res.send(result);
    } catch (err) {
      session.abortTransaction();
      res.status(err.status).send(err);
    } finally {
      session.endSession();
    }
  }

  @Delete("/guest")
  @ApiOperation({
    summary: "게스트 계정 삭제",
    description: "사이트 체험을 하기 위한 게스트 계정을 삭제한다.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "Bearer + 엑세스 토큰",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "OK",
    type: DeleteGuestResDto,
  })
  @ApiBadRequestResponse({
    description: "Bad Request",
    type: BadRequestErr,
  })
  @ApiUnauthorizedResponse({
    description: "유효하지 않은 토큰입니다.",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "유저 정보가 정상적으로 삭제되지 않았습니다.",
    type: InternalSeverErr,
  })
  async removeGuest(
    @Headers("Authorization") authorization: string,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      const result = await this.userService.removeGuest(authorization);
      session.commitTransaction();
      return res.send({ result });
    } catch (err) {
      session.abortTransaction();
      res.status(err.status).send(err);
    } finally {
      session.endSession();
    }
  }
}
