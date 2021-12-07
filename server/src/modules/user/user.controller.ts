import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Delete,
  Res,
  HttpStatus,
  InternalServerErrorException,
  UseFilters,
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
} from "@nestjs/swagger";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

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
//import { HttpExceptionFilter } from "src/commons/http-exception.filter";

@Controller("users")
@ApiTags("User API")
export class UserController {
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private readonly userService: UserService,
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
  async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    // 몽고 세션 연결
    const session = await this.mongoConnection.startSession();
    // 트랜잭션 시작
    session.startTransaction();
    try {
      const newUser: any = await this.userService.createUser(createUserDto);
      await session.commitTransaction(); // 이상없이 진행시 커밋
      return res.status(HttpStatus.CREATED).send(newUser);
    } catch (err) {
      await session.abortTransaction(); // 이상 발생시 커밋 취소
      throw new InternalServerErrorException("Internal server Error");
    } finally {
      session.endSession(); // 세션 연결 종료
    }
  }

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
  async getUserInfoAll(
    @Headers("Authorization") authorization: string,
    @Res() res: any,
  ) {
    const user: any = await this.userService.getUserInfoAll(authorization);
    return res.status(HttpStatus.OK).send(user);
  }

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
  async update(
    @Headers("Authorization") authorization: string,
    @Body("new_password") new_password: string,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      const user: any = await this.userService.updatePassword(
        authorization,
        new_password,
      );
      if (user) {
        await session.commitTransaction();
        return res
          .status(HttpStatus.CREATED)
          .send({ message: "비밀번호 수정 성공" });
      }
    } catch {
      await session.abortTransaction();
      throw new InternalServerErrorException("Internal Server Error");
    } finally {
      session.endSession();
    }
  }

  @Delete()
  @ApiOperation({ summary: "회원 탈퇴 API" })
  @ApiNoContentResponse({
    description: "아이디가 일치하는 유저 정보를 삭제한다.",
  })
  async signOut(
    @Headers("Authorization") authorization: string,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();

    try {
      await this.userService.remove(authorization);
      await session.commitTransaction();
      return res
        .status(HttpStatus.OK)
        .send({ message: "회원탈퇴에 성공했습니다" });
    } catch (err) {
      await session.abortTransaction();
      throw new InternalServerErrorException("Internal Server Error");
    } finally {
      session.endSession();
    }
  }
}
