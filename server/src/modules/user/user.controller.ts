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

@Controller("users")
@ApiTags("User API")
export class UserController {
  constructor(private readonly userService: UserService) {}

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
    const newUser: any = await this.userService.createUser(createUserDto);
    if (newUser) return res.status(HttpStatus.CREATED).send("Created");
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
  async updatePassword(
    @Headers("Authorization") authorization: string,
    @Body("new_password") new_password: string,
    @Res() res: any,
  ) {
    await this.userService.updatePassword(authorization, new_password);
    return res.status(HttpStatus.OK).send("비밀번호 수정 성공");
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
    const result: any = await this.userService.signOut(authorization);
    if (result)
      return res.status(HttpStatus.OK).send("회원탈퇴에 성공했습니다");
  }
}
