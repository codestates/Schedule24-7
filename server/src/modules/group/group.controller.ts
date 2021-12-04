import {
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Delete,
  Headers,
  Res,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { Connection } from "mongoose";

import { GroupService } from "./group.service";
import { Group } from "src/entities/group.entity";
import { GetGroup } from "src/commons/decorator.dto";

@Controller("group")
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    private readonly mongoConnection: Connection,
  ) {}

  @Post()
  async createGroup(
    @Headers("Authorization") authorization: string,
    @GetGroup() group: Group,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const createdGroup: any = await this.groupService.createGroup(
        authorization,
        group,
      );
      // 신규 그룹 생성에 성공했는가?
      if (createdGroup) {
        await session.commitTransaction();
        return res.status(HttpStatus.CREATED).send("Created");
      }
    } catch (err) {
      await session.abortTransaction();
      throw new InternalServerErrorException("Internal Server Error");
    } finally {
      session.endSession();
    }
  }

  @Get()
  async getGroup(
    @Headers("Authorization") authorization: string,
    @Res() res: any,
  ) {
    const result: any = await this.groupService.getGroup(authorization);
    return res.status(HttpStatus.OK).send(result);
  }

  // 그룹정보 업데이트
  @Patch(":groupId")
  async updateGroup(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @GetGroup() group: Group,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result: any = await this.groupService.updateGroup(
        authorization,
        groupId,
        group,
      );
      if (result) {
        await session.commitTransaction();
        return res.status(HttpStatus.CREATED).send(result);
      }
    } catch (err) {
      await session.abortTransaction();
      throw new InternalServerErrorException(err);
    } finally {
      session.endSession();
    }
  }

  // 그룹 삭제
  @Delete(":id")
  async removeGroup(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      await this.groupService.removeGroup(authorization, groupId);
      return res.status(HttpStatus.OK).send("OK");
    } catch {
      throw new InternalServerErrorException("Internal Server Error");
    } finally {
      session.endSession();
    }
  }
}
