import {
  Controller,
  Get,
  Post,
  Body,
  Headers,
  Patch,
  Delete,
  Res,
  Param,
  HttpStatus,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
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

import { UserService } from "./user.service";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "./dto/request/create-user.dto";
import { CreateUserResDto } from "./dto/response/create-user.dto";
import {
  BadRequestErr,
  ConflictErr,
  InternalSeverErr,
  NotFoundErr,
  UnauthorizeErr,
} from "src/commons/http-exception.dto";
import { GetUserInfoResDto } from "./dto/response/select-user.dto";
import { UpdateUserResDto } from "./dto/response/update-user.dto";
import { HttpExceptionFilter } from "src/commons/http-exception.filter";
import { FindUserIdDto } from "./dto/request/find-userId.dto";
import { FindPasswordDto } from "./dto/request/find-password.dto";

@UseFilters(HttpExceptionFilter)
@Controller("users")
@ApiTags("User API")
export class UserController {
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private readonly userService: UserService,
    private readonly authService: AuthService,
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
      throw new BadRequestException(err);
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
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    const accessToken: string = authorization.split(" ")[1];
    if (!accessToken) throw new BadRequestException("Bad Request");
    try {
      const { _id }: any = await this.authService.checkToken(accessToken);
      if (!_id) throw new UnauthorizedException("Unauthorized");
      const user: any = await this.userService.getUserInfoAll(_id);
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(user);
    } catch {
      await session.abortTransaction();
      throw new InternalServerErrorException("Internal Server Error");
    } finally {
      session.endSession();
    }
  }

  @Get("/info")
  async getUserInfo(
    @Headers("Authorization") authorization: string,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    const accessToken: string = authorization.split(" ")[1];
    if (!accessToken) throw new BadRequestException("Bad Request");
    try {
      const { _id }: any = await this.authService.checkToken(accessToken);
      if (!_id) throw new UnauthorizedException("Unauthorized");
      const user: any = await this.userService.getUserInfo(_id);
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send(user);
    } catch {
      await session.abortTransaction();
      throw new InternalServerErrorException("Internal Server Error");
    } finally {
      session.endSession();
    }
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

    const accessToken: string = authorization.split(" ")[1];
    if (!accessToken) throw new BadRequestException("Bad Request");
    try {
      const { _id }: any = await this.authService.checkToken(accessToken);
      if (!_id) throw new UnauthorizedException("Unauthorized");

      const user: any = await this.userService.updatePassword(
        _id,
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

    const accessToken: string = authorization.split(" ")[1];
    if (!accessToken) throw new BadRequestException("Bad Request");
    try {
      const { _id }: any = await this.authService.checkToken(accessToken);
      if (!_id) throw new UnauthorizedException("Unauthorized");
      await this.userService.remove(_id);
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

  // 동일한 유저아이디 체크
  @Get("checkUserId/:userId")
  async checkUserId(@Param("userId") userId: string, @Res() res: any) {
    try {
      console.log(userId);
      // 요청 정보가 제대로 왔는지
      if (!userId) throw new BadRequestException("bad request");
      const result: any = await this.userService.checkUserId(userId);
      // 동일한 아이디가 없을시
      if (!result)
        return res
          .status(HttpStatus.OK)
          .send({ result, message: "가입 가능한 아이디입니다." });
      // 동일한 아이디가 있을시
      else
        return res
          .status(HttpStatus.CONFLICT)
          .send({ result, message: "돌일한 아이디가 있습니다." });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // 비밀번호 일치
  @Get("checkPassword/:password")
  async checkPassword(
    @Headers("Authorization") authorization: string,
    @Param("password") password: string,
    @Res() res: any,
  ) {
    const accessToken: string = authorization.split(" ")[1];
    if (!accessToken || !password) throw new BadRequestException("Bad Request");
    try {
      const { _id }: any = await this.authService.checkToken(accessToken);
      const result: boolean = await this.userService.checkPassword(
        _id,
        password,
      );
      if (result)
        res
          .status(HttpStatus.OK)
          .send({ result, message: "동일한 비밀번호입니다." });
      else
        res
          .status(HttpStatus.OK)
          .send({ result, message: "동일한 비밀번호가 아닙니다." });
    } catch (err) {
      throw new InternalServerErrorException("Internal server error");
    }
  }

  // 유저아이디 찾기
  @Post("findId")
  async findId(
    @Headers("Authorization") authorization: string,
    @Body() findUserIdDto: FindUserIdDto,
    @Res() res: any,
  ) {
    const accessToken: string = authorization.split(" ")[1];
    if (!accessToken || !findUserIdDto)
      throw new BadRequestException("Bad Request");
    const { _id }: any = await this.authService.checkToken(accessToken);
    try {
      const userId: string = await this.userService.findId(_id, findUserIdDto);
      return res.status(HttpStatus.OK).send(userId);
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  // 유저 비밀번호 찾기
  @Post("findPassword")
  async findPassword(
    @Headers("Authorization") authorization: string,
    @Body() findPasswordDto: FindPasswordDto,
    @Res() res: any,
  ) {
    return res.status(HttpStatus.OK).send();
  }
}
