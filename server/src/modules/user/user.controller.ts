import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from "@nestjs/common";
import { Schema as MongooseSchema } from "mongoose";
import {
  ApiTags,
  ApiOperation,
  ApiCreatedResponse,
  ApiOkResponse,
} from "@nestjs/swagger";

import { User } from "src/entities/user.entity";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
//import { UpdateUserDto } from "./dto/update-user.dto";

@Controller("users")
@ApiTags("User API")
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ summary: "User 생성 API", description: "유저 등록" })
  @ApiCreatedResponse({ description: "회원 등록을 한다.", type: User })
  async create(@Body() createUserDto: CreateUserDto, @Res() res: any) {
    console.log("hello");
    console.log(createUserDto);
    const newUser: any = await this.userService.createUser(createUserDto);
    return res.status(HttpStatus.CREATED).send(newUser);
  }

  @Get(":id")
  @ApiOperation({ summary: "User 조회 API", description: "유저 조회" })
  @ApiOkResponse({
    description: "아이디가 일치하는 유저 정보를 조회한다.",
    type: User,
  })
  async findUser(
    @Param("id") id: MongooseSchema.Types.ObjectId,
    @Res() res: any,
  ) {
    const user: any = await this.userService.getUserFindById(id);
    return res.status(HttpStatus.OK).send(user);
  }

  // @Get()
  // @ApiOperation({summary: "모든 유저 조회 API", description: "모든 유저 조회"})
  // @ApiOkResponse({description: "모든 유저 정보를 조회한다.", type: User})
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Patch(":id")
  // @ApiOperation({summary: "유저 정보 API"})
  // @ApiOkResponse({description: "아이디가 일치하는 유저 정보를 수정한다.", type: User})
  // update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(":id")
  // @ApiOperation({summary: "유저 삭제 API"})
  // @ApiNoContentResponse({description: "아이디가 일치하는 유저 정보를 삭제한다."})
  // remove(@Param("id") id: string) {
  //   return this.userService.remove(+id);
  // }
}
