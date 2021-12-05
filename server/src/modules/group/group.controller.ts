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
  Body,
} from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { GroupService } from "./group.service";
import { Group } from "src/entities/group.entity";
import { GetGroup } from "src/commons/decorator.dto";

@Controller("group")
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    @InjectConnection()
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
  @Delete(":groupId")
  async removeGroup(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      await this.groupService.removeGroup(authorization, groupId);
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send("OK");
    } catch {
      await session.abortTransaction();
      throw new InternalServerErrorException("Internal Server Error");
    } finally {
      session.endSession();
    }
  }

  /**
   * TODO 멤버 API 작성
   */

  // ! 테스트용 멤버 관련 데이터 리셋
  @Delete("/member/:groupId")
  async resetMember(@Param("groupId") groupId: string) {
    try {
      return this.groupService.resetMember(groupId);
    } catch (err) {
      throw new Error(err);
    }
  }

  // ? 새로운 멤버 추가
  @Post("/member/:groupId")
  async createMember(
    @Param("groupId") groupId: string,
    @Headers("Authorization") authorization: string,
    @GetGroup() member: Group,
  ) {
    try {
      return this.groupService.createMember(authorization, member, groupId);
    } catch (error) {
      throw new Error(error);
    }
  }

  // ? 기존 멤버 편집
  @Patch("/member/:groupId/:memberId")
  async updateMember(
    @Param() params: { groupId: string; memberId: number },
    @Headers("Authorization") authorization: string,
    @Body() memberData: any,
  ) {
    try {
      return await this.groupService.updateMember(
        authorization,
        params,
        memberData,
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  @Delete("/member/:groupId/:memberId")
  async removeMember(
    @Param() params: { groupId: string; memberId: number },
    @Headers("Authorization") authorization: string,
  ) {
    try {
      return await this.groupService.removeMember(authorization, params);
    } catch (error) {
      throw new Error(error);
    }
  }
}
