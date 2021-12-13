import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Headers,
} from "@nestjs/common";
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiHeader,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from "@nestjs/swagger";

import { ScheduleService } from "./schedule.service";
import { CreateScheduleDto } from "./dto/request/create-schedule.dto";
import HttpError from "src/commons/httpError";
import {
  BadRequestErr,
  InternalSeverErr,
  UnauthorizeErr,
} from "src/commons/http-exception.dto";
import { CreateScheduleResDto } from "./dto/response/create-schedule.dto";
import { ModifyScheduleDto } from "./dto/request/modify-schedule.dto";
import { ModifyScheduleResDto } from "./dto/response/modify-schedule.dto";
import { UpdateScheduleDto } from "./dto/request/update-schedule.dto";
import { UpdateScheduleResDto } from "./dto/response/update-schedule.dto";
import { DeleteScheduleResDto } from "./dto/response/delete-schedule.dto";
import { GetScheduleResDto } from "./dto/response/get-schedule.dto";
import { GetSchedule } from "src/commons/decorator.dto";

@Controller("schedule")
@ApiTags("Schedule API")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @ApiBearerAuth()
  @Post(":groupId")
  @ApiOperation({
    summary: "새로운 스케쥴 추가",
    description: "대상되는 그룹에 새로운 스케쥴을 생성시키는 요청을 보냅니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다.",
    required: true,
    example: "Bearer + AccessToken",
  })
  @ApiParam({
    name: "groupId",
    description: "수정할 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiCreatedResponse({ description: "Created", type: CreateScheduleResDto })
  @ApiBadRequestResponse({ description: "Bad Reqeust", type: BadRequestErr })
  @ApiUnauthorizedResponse({
    description: "Unauthorized",
    type: UnauthorizeErr,
  })
  @ApiInternalServerErrorResponse({
    description: "Internal server error",
    type: InternalSeverErr,
  })
  async createSchedule(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Body() scheduleDto: CreateScheduleDto,
  ) {
    console.log(scheduleDto);
    // 스케쥴 생성 서비스를 이용하여 생성된 스켸줄 정보를 할당한다.
    await this.scheduleService.createSchedule(
      authorization,
      groupId,
      scheduleDto,
    );

    return {
      statusCode: 201,
      message: "Created",
    };
  }

  // 스케쥴 수정: 기본 정보(이름, 이모지)
  @ApiBearerAuth()
  @Patch(":groupId/:scheduleId")
  @ApiOperation({
    summary: "스케쥴 기본 정보 수정",
    description:
      "대상되는 그룹의 기존 스케쥴 데이터 중 기본정보(이름, 이모지)를 수정합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다.",
    required: true,
    example: "Bearer + AccessToken",
  })
  @ApiParam({
    name: "groupId",
    description: "해당 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiParam({
    name: "scheduleId",
    description: "수정할 스케쥴 도큐먼트 id값",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "스케쥴의 기본정보가 정상적으로 변경되었습니다.",
    type: ModifyScheduleResDto,
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
  async modifySchedule(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Param("scheduleId") scheduleId: string,
    @Body() schedule: ModifyScheduleDto,
  ) {
    // 요청 정보 확인
    if (
      !authorization ||
      !groupId ||
      !scheduleId ||
      !schedule ||
      !Object.keys(schedule).length
    ) {
      throw new HttpError(400, "Bad Requst");
    }

    // 토큰정보, 그룹아이디, 스케쥴 아이디, 스케쥴 기본정보를 통해 스케쥴 기본 정보 수정
    await this.scheduleService.modifySchedule(
      authorization,
      groupId,
      scheduleId,
      schedule,
    );

    return {
      statusCode: 200,
      memssage: "스케쥴의 기본정보가 정상적으로 변경되었습니다.",
    };
  }

  // 스케쥴 배정 인원 수정
  @ApiBearerAuth()
  @Patch(":groupId/:scheduleId/:contentId")
  @ApiOperation({
    summary: "스케쥴 배정 인원 수정",
    description: "스케쥴 상에 배정된 기존 인원을 변경합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다.",
    required: true,
    example: "Bearer + AccessToken",
  })
  @ApiParam({
    name: "groupId",
    description: "해당 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiParam({
    name: "scheduleId",
    description: "수정할 스케쥴 도큐먼트 id값",
    required: true,
  })
  @ApiParam({
    name: "contentId",
    description: "수정할 콘텐츠 id값",
    required: true,
  })
  @ApiBody({ type: UpdateScheduleDto })
  @ApiResponse({
    status: 200,
    description: "스케쥴의 기본정보가 정상적으로 변경되었습니다.",
    type: UpdateScheduleResDto,
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
  async updateSchedule(
    @Headers("Authorization") authorization: string,
    @Param() params: { groupId: string; scheduleId: string; contentId: number },
    @GetSchedule() schedule: any,
  ) {
    // 요청 정보 확인
    if (
      !authorization ||
      !params.groupId ||
      !params.scheduleId ||
      !params.contentId ||
      !schedule ||
      !Object.keys(schedule).length
    ) {
      throw new HttpError(400, "Bad Requst");
    }
    const { team } = schedule;
    await this.scheduleService.updateSchedule(authorization, params, team);

    return {
      statusCode: 200,
      message: "스케쥴 배정 인원 수정이 완료됐습니다.",
    };
  }

  // 스켸쥴 삭제
  @ApiBearerAuth()
  @Delete(":groupId/:scheduleId")
  @ApiOperation({
    summary: "스케쥴 삭제",
    description: "대상되는 그룹의 기존 스케쥴을 삭제합니다.",
  })
  @ApiHeader({
    name: "Authorization",
    description: "다음과 같이 Authorization 헤더에 토큰 값을 부여합니다.",
    required: true,
    example: "Bearer + AccessToken",
  })
  @ApiParam({
    name: "groupId",
    description: "해당 그룹 도큐먼트 id값",
    required: true,
  })
  @ApiParam({
    name: "scheduleId",
    description: "수정할 스케쥴 도큐먼트 id값",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "스케쥴이 정상적으로 삭제되었습니다.",
    type: DeleteScheduleResDto,
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
  async removeSchedule(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Param("scheduleId") scheduleId: string,
  ) {
    // 요청 정보 확인
    if (!authorization || !groupId || !scheduleId) {
      throw new HttpError(400, "Bad Requst");
    }
    await this.scheduleService.removeSchedule(
      authorization,
      groupId,
      scheduleId,
    );
    return {
      statusCode: 200,
      message: "스케쥴이 정상적으로 삭제되었습니다.",
    };
  }

  // 스케쥴 공유링크로 들어왔을때 해당하는 스케쥴 아이디의 정보 조회
  @Get("/share/:scheduleId")
  @ApiOperation({
    summary: "개별 스케쥴 내용 조회",
    description:
      "공유 링크 생성시, 개별 스케쥴 내용을 조회할 수 있도록 하기 위한 API",
  })
  @ApiParam({
    name: "scheduleId",
    description: "수정할 스케쥴 도큐먼트 id값",
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: "OK",
    type: GetScheduleResDto,
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
  async shareSchedule(@Param("scheduleId") scheduleId: string) {
    // 요청 정보 확인
    if (!scheduleId) throw new HttpError(400, "Bad Request");

    const result: any = await this.scheduleService.shareSchedule(scheduleId);

    return {
      statusCode: 200,
      message: "OK",
      result: result,
    };
  }
}
