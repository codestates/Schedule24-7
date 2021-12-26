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
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { GroupService } from "./group.service";
import { CreateGroupReqDto } from "./dto/request/createGroup.dto";
import { CreateConditionDto } from "./dto/request/createCondition.dto";
import { UpdateConditionDto } from "./dto/request/updateCondition.dto";
import HttpError from "src/commons/httpError";
import {
  BadRequestErr,
  ConflictErr,
  InternalSeverErr,
  UnauthorizeErr,
} from "src/commons/http-exception.dto";
import { CreateGroupResDto } from "./dto/response/createGroup.dto";
import { getGroupInfoResDto } from "./dto/response/getGroupInfo.dto";
import { UpdateGroupReqDto } from "./dto/request/updateGroup.dto";
import { UpdateGroupResDto } from "./dto/response/updateGroup.dto";
import { DeleteGroupResDto } from "./dto/response/deleteGroup.dto";
import { ResetMemberResDto } from "./dto/response/resetMember.dto";
import { CreateMemberResDto } from "./dto/response/createMember.dto";
import { CreateMemberReqDto } from "./dto/request/createMember.dto";
import { UpdateMemberReqDto } from "./dto/request/updateMember.dto";
import { UpdateMemberResDto } from "./dto/response/updateMember.dto";
import { DeleteMemberResDto } from "./dto/response/deleteMember.dto";
import { CreateConditionResDto } from "./dto/response/createCondition.dto";
import { UpdateConditionResDto } from "./dto/response/updateCondition.dto";
import { DeleteConditionResDto } from "./dto/response/deleteCondition.dto";
import { PushMemberResDto } from "./dto/response/pushMember.dto";

@Controller("group")
@ApiTags("Group API")
export class GroupController {
  constructor(
    private readonly groupService: GroupService,
    @InjectConnection()
    private readonly mongoConnection: Connection,
  ) {}

  //신규 그룹 생성
  @ApiBearerAuth()
  @Post()
  @ApiOperation({
    summary: "신규 그룹 생성",
    description: "신규 그룹을 생성합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다.",
    required: true,
  })
  @ApiCreatedResponse({ description: "Created", type: CreateGroupResDto })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async createGroup(
    @Headers("Authorization") authorization: string,
    @Body() group: CreateGroupReqDto,
  ) {
    // 요청이 제대로 오지 않을 시
    if (!authorization || !group || !Object.keys(group).length)
      throw new HttpError(400, "Bad Reqeust");
    // 요청이 제대로 왔을시 그룹 생성 서비스 시작
    await this.groupService.createGroup(authorization, group);

    return {
      statusCode: 201,
      message: "Created",
    };
  }

  // 해당 그룹 정보 조회
  @ApiBearerAuth()
  @Get()
  @ApiOperation({
    summary: "그룹 데이터 조회",
    description: "유저의 그룹데이터를 전제 조회합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다.",
    required: true,
  })
  @ApiBody({ type: CreateGroupReqDto })
  @ApiResponse({
    status: 200,
    description: "OK",
    type: getGroupInfoResDto,
  })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async getGroup(@Headers("Authorization") authorization: string) {
    console.log(authorization);
    if (!authorization) throw new HttpError(400, "Bad Request");
    const result: any = await this.groupService.getGroup(authorization);
    return result;
    /**
    return {
      data: result,
      statusCode: 200,
      message: "OK",
    }
    */
  }

  // 그룹정보 업데이트
  @ApiBearerAuth()
  @Patch(":groupId")
  @ApiOperation({
    summary: "그룹데이터 수정",
    description: "하나의 그룹 데이터를 수정한다.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다.",
    required: true,
  })
  @ApiParam({
    name: "groupId",
    description: "수정할 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiResponse({ status: 200, description: "OK", type: UpdateGroupResDto })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async updateGroup(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Body() group: UpdateGroupReqDto,
  ) {
    if (!authorization || !groupId || !Object.keys(group).length) {
      throw new HttpError(400, "Bad Requst");
    }
    await this.groupService.updateGroup(authorization, groupId, group);

    return {
      statusCode: 200,
      message: "Updated",
    };
  }

  // 그룹 삭제
  @ApiBearerAuth()
  @Delete(":groupId")
  @ApiOperation({
    summary: "그룹데이터 삭제",
    description: "하나의 그룹 데이터를 삭제한다.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다.",
    required: true,
  })
  @ApiParam({
    name: "groupId",
    description: "수정할 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiResponse({ status: 200, description: "OK", type: DeleteGroupResDto })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async removeGroup(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
  ) {
    if (!authorization || !groupId) throw new HttpError(400, "Bad Request");
    await this.groupService.removeGroup(authorization, groupId);
    return {
      statusCode: 200,
      message: "Deleted",
    };
  }

  /**
   * TODO 멤버 API 작성
   */

  // ! 테스트용 멤버 관련 데이터 리셋
  @Delete("/member/:groupId")
  @ApiOperation({
    summary: "테스트용 멤버 리셋",
    description: "테스트용 멤버 관련 정보를 삭제한다.",
  })
  @ApiParam({
    name: "groupId",
    description: "수정할 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiResponse({ status: 200, description: "OK", type: ResetMemberResDto })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async resetMember(@Param("groupId") groupId: string) {
    try {
      return this.groupService.resetMember(groupId);
    } catch (err) {
      throw new Error(err);
    }
  }

  // ? 새로운 멤버 추가
  @ApiBearerAuth()
  @Post("/member/:groupId")
  @ApiOperation({
    summary: "새로운 멤버 추가",
    description: "대상되는 그룹에 새로운 멤버 정보를 추가합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description:
      "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다. / Bearer + AccessToken",
    required: true,
  })
  @ApiParam({
    name: "groupId",
    description: "수정할 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "업데이트가 정상적으로 완료되었습니다.",
    type: CreateMemberResDto,
  })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "업데이트가 정상적으로 완료되지 않았습니다.",
    type: InternalSeverErr,
  })
  async createMember(
    @Param("groupId") groupId: string,
    @Headers("Authorization") authorization: string,
    @Body() member: CreateMemberReqDto,
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
  @ApiBearerAuth()
  @Patch("/member/:groupId/:memberId")
  @ApiOperation({
    summary: "멤버 정보 수정",
    description: "기존에 존재하는 멤버의 정보를 수정합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description:
      "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다. / Bearer + AccessToken",
    required: true,
  })
  @ApiParam({
    name: "groupId",
    description: "수정할 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiParam({
    name: "memberId",
    description: "수정할 멤버 id값",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "업데이트가 정상적으로 완료되었습니다.",
    type: UpdateMemberResDto,
  })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiConflictResponse({ description: "Conflict", type: ConflictErr })
  @ApiInternalServerErrorResponse({
    description: "업데이트가 정상적으로 완료되지 않았습니다.",
    type: InternalSeverErr,
  })
  async updateMember(
    @Param() params: { groupId: string; memberId: number },
    @Headers("Authorization") authorization: string,
    @Body() memberData: UpdateMemberReqDto,
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
  @ApiBearerAuth()
  @Delete("/member/:groupId/:memberId")
  @ApiOperation({
    summary: "멤버 삭제",
    description: "기존에 존재하는 멤버를 삭제합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description:
      "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다. / Bearer + AccessToken",
    required: true,
  })
  @ApiParam({
    name: "groupId",
    description: "수정할 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiParam({
    name: "memberId",
    description: "수정할 멤버 id값",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "삭제가 정상적으로 완료되었습니다.",
    type: DeleteMemberResDto,
  })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "삭제가 정상적으로 완료되지 않았습니다",
    type: InternalSeverErr,
  })
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
  @ApiBearerAuth()
  @Post("/condition/:groupId")
  @ApiOperation({
    summary: "그룹 조건 추가",
    description: "대상되는 그룹에 새로운 조건을 추가합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description:
      "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다. / Bearer + AccessToken",
    required: true,
  })
  @ApiParam({
    name: "groupId",
    description: "수정할 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "조건 추가가 완료되었습니다",
    type: CreateConditionResDto,
  })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiConflictResponse({ description: "Conflict", type: ConflictErr })
  @ApiInternalServerErrorResponse({
    description: "조건 추가가 완료되지 않았습니다.",
    type: InternalSeverErr,
  })
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
  @ApiBearerAuth()
  @Patch("/condition/:groupId/:conditionId")
  @ApiOperation({
    summary: "그룹 조건 수정",
    description: "대상되는 그룹에 기존 조건 내용을 수정합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description:
      "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다. / Bearer + AccessToken",
    required: true,
  })
  @ApiParam({
    name: "groupId",
    description: "수정할 그룹 조건이 속한 그룹의 아이디",
    required: true,
  })
  @ApiParam({
    name: "conditionId",
    description: "수정할 그룹 조건의 아이디",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "조건 추가가 완료되었습니다",
    type: UpdateConditionResDto,
  })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "조건 추가가 정상적으로 이루어지지 않았습니다",
    type: InternalSeverErr,
  })
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
  @ApiBearerAuth()
  @Delete("/condition/:groupId/:conditionId")
  @ApiOperation({
    summary: "그룹 조건 삭제",
    description: "기존에 존재하는 그룹 조건을 삭제합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description:
      "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다. / Bearer + AccessToken",
    required: true,
  })
  @ApiParam({
    name: "groupId",
    description: "수정할 그룹 조건이 속한 그룹의 아이디",
    required: true,
  })
  @ApiParam({
    name: "conditionId",
    description: "수정할 그룹 조건의 아이디",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "조건 삭제가 완료되었습니다",
    type: DeleteConditionResDto,
  })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "조건 삭제가 정상적으로 이루어지지 않았습니다",
    type: InternalSeverErr,
  })
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
  @ApiBearerAuth()
  @Post("member/push/:groupId")
  @ApiOperation({
    summary: "CSV파일로 그룹에 멤버 추가",
    description: "그룹에 CSV파일을 통한 멤버를 추가합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description:
      "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다. / Bearer + AccessToken",
    required: true,
  })
  @ApiParam({
    name: "groupId",
    description: "해당 그룹의 아이디",
    required: true,
  })
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: "멤버가 정상적으로 추가되었습니다.",
    type: PushMemberResDto,
  })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal Server Error",
    type: InternalSeverErr,
  })
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
      return res.status(HttpStatus.OK).send(result);
    } catch (err) {
      await session.abortTransaction();
      return res.status(err.status).send(err);
    } finally {
      session.endSession();
    }
  }
}
