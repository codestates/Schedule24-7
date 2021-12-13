import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Headers,
  HttpStatus,
} from "@nestjs/common";

import { ScheduleService } from "./schedule.service";
import { GetSchedule } from "src/commons/decorator.dto";
import { Schedule } from "src/entities/schedule.entity";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import HttpError from "src/commons/httpError";

@Controller("schedule")
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post(":groupId")
  async createSchedule(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Body() scheduleDto: CreateScheduleDto,
    @Res() res: any,
  ) {
    const result: any = await this.scheduleService.createSchedule(
      authorization,
      groupId,
      scheduleDto,
    );
    if (result) {
      return res.status(HttpStatus.CREATED).send(result);
    }
  }

  // 스케쥴 수정: 기본 정보
  @Patch(":groupId/:scheduleId")
  async modifySchedule(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Param("scheduleId") scheduleId: string,
    @GetSchedule() schedule: Schedule,
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
    await this.scheduleService.modifySchedule(
      authorization,
      groupId,
      scheduleId,
      schedule,
    );
    return {
      status: 200,
      memssage: "OK",
    };
  }

  // 스케쥴 배정 인원 수정
  @Patch(":groupId/:scheduleId/:contentId")
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
      status: 200,
      message: "OK",
    };
  }

  // 스켸쥴 삭제
  @Delete(":groupId/:scheduleId")
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
      status: 200,
      message: "OK",
    };
  }

  // 스케쥴 공유링크로 들어왔을때 해당하는 스케쥴 아이디의 정보 조회
  @Get("/share/:scheduleId")
  async shareSchedule(
    @Param("scheduleId") scheduleId: string,
    @Res() res: any,
  ) {
    const result: any = await this.scheduleService.shareSchedule(scheduleId);
    return res.status(HttpStatus.OK).send(result);
  }
}
