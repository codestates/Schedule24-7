import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
  Res,
  HttpStatus,
  UnauthorizedException,
  InternalServerErrorException,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common";

import { GroupService } from "./group.service";
import { AuthService } from "../auth/auth.service";
import { Group } from "src/entities/group.entity";
import { GetGroup } from "src/commons/decorator.dto";
import { UserService } from "../user/user.service";
import { AuthRepository } from "src/repositories/auth.repository";

@Controller("group")
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly authService: AuthService,
    private readonly userService: UserService,
    private readonly authRepository: AuthRepository,
  ) {}

  @Post()
  async create(
    @Headers("Authorization") authorization: string,
    @GetGroup() group: Group,
    @Res() res: any,
  ) {
    // 트큰이 왔는가?
    if (!authorization) throw new BadRequestException("Bad Request");
    const accessToken: string = authorization.split(" ")[1];
    // 유효한 토큰인가?
    if (!accessToken) throw new UnauthorizedException("Unauthorized");
    try {
      const { _id }: any = await this.authRepository.validateToken(accessToken);
      // 토큰의 오브젝트아이디정보가 제대로 들어있는가?
      if (!_id) throw new UnauthorizedException("Unauthorized");
      const createdGroup: any = await this.groupService.createGroup(group);
      // 신규 그룹 생성에 성공했는가?
      if (createdGroup) {
        // 성공시 user에 그룹 아이디 추가
        const result: any = await this.userService.addGroupIdFromGroup(
          _id,
          createdGroup,
        );
        // 그룹아이디 추가 성공시 응답 메시지 전송
        if (result) return res.status(HttpStatus.CREATED).send("Created");
      }
    } catch (err) {
      throw new InternalServerErrorException("Internal Server Error");
    }
    return res.status(HttpStatus.OK).send();
  }

  // @Get()
  // findAll() {
  //   return this.groupService.findAll();
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string) {
  //   return this.groupService.remove(+id);
  // }
}
