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
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";
import { Response } from "express";
import { FileInterceptor } from "@nestjs/platform-express";
import { extname } from "path";
import { diskStorage } from "multer";

import { GroupService } from "./group.service";
import { Group } from "src/entities/group.entity";
import { GetGroup } from "src/commons/decorator.dto";
import { CreateConditionDto } from "./dto/createCondition.dto";
import { UpdateConditionDto } from "./dto/updateCondition.dto";

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
        return res.status(HttpStatus.CREATED).send("Updated");
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
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.groupService.createMember(
        authorization,
        member,
        groupId,
      );
      await session.commitTransaction();
      return res.status(201).send({ result });
    } catch (error) {
      await session.abortTransaction();
      return res.status(error.status).send(error);
    } finally {
      await session.endSession();
    }
  }

  // ? 기존 멤버 편집
  @Patch("/member/:groupId/:memberId")
  async updateMember(
    @Param() params: { groupId: string; memberId: number },
    @Headers("Authorization") authorization: string,
    @Body() memberData: any,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.groupService.updateMember(
        authorization,
        params,
        memberData,
      );
      await session.commitTransaction();
      return res.send({ result });
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      await session.endSession();
    }
  }

  // ? 기존 멤버 삭제
  @Delete("/member/:groupId/:memberId")
  async removeMember(
    @Param() params: { groupId: string; memberId: number },
    @Headers("Authorization") authorization: string,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.groupService.removeMember(
        authorization,
        params,
      );
      await session.commitTransaction();
      return res.send({ result });
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      await session.endSession();
    }
  }

  /**
   *
   * Todo : 조건 관련 명령어 ------------------------
   */

  // ? 새로운 조건 추가
  @Post("/condition/:groupId")
  async createCondition(
    @Param("groupId") groupId: string,
    @Headers("Authorization") authorization: string,
    @Body()
    condition: CreateConditionDto,
    @Res() res: Response,
  ): Promise<any> {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.groupService.createCondition(
        authorization,
        groupId,
        condition,
      );
      await session.commitTransaction();
      return res.send({ result });
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      await session.endSession();
    }
  }

  // ? 기존 조건 수정
  @Patch("/condition/:groupId/:conditionId")
  async updateCondition(
    @Param() params: { groupId: string; conditionId: number },
    @Headers("Authorization") authorization: string,
    @Body() conditionData: UpdateConditionDto,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.groupService.updateCondition(
        authorization,
        params,
        conditionData,
      );
      await session.commitTransaction();
      return res.send({ result });
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      await session.endSession();
    }
  }

  // ? 기존 조건 삭제
  @Delete("/condition/:groupId/:conditionId")
  async removeCondition(
    @Param() params: { groupId: string; conditionId: number },
    @Headers("Authorization") authorization: string,
    @Res() res: Response,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result = await this.groupService.removeCondition(
        authorization,
        params,
      );
      await session.commitTransaction();
      return res.send({ result });
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      await session.endSession();
    }
  }

  // 멤버 정보가 담긴 csv파일을 읽어서 디비에 저장하기
  @Post("member/upload/:groupId")
  @UseInterceptors(
    FileInterceptor("csv", {
      storage: diskStorage({
        destination: "./csv",
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join("");
          cb(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async pushToMemeber(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @UploadedFile() file,
    @Res() res: any,
  ) {
    const session = await this.mongoConnection.startSession();
    session.startTransaction();
    try {
      const result: any = await this.groupService.pushToMember(
        file,
        authorization,
        groupId,
      );
      await session.commitTransaction();
      return res.status(HttpStatus.CREATED).send(result);
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      session.endSession();
    }
  }
}
