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
    @Res() res: any,
  ) {
    // 요청 정보 확인
    if (
      !authorization ||
      !groupId ||
      !scheduleId ||
      !Object.keys(schedule).length
    ) {
      throw new HttpError(400, "Bad Requst");
    }
    const result: any = await this.scheduleService.modifySchedule(
      authorization,
      groupId,
      scheduleId,
      schedule,
    );
    if (result) return res.status(HttpStatus.OK).send(result);
  }

  // 스케쥴 배정 인원 수정
  @Patch(":groupId/:scheduleId/:contentId")
  async updateSchedule(
    @Headers("Authorization") authorization: string,
    @Param() params: { groupId: string; scheduleId: string; contentId: number },
    @GetSchedule() schedule: any,
    @Res() res: any,
  ) {
    const { team } = schedule;

    // 요청 정보 확인
    if (
      !authorization ||
      !params.groupId ||
      !params.scheduleId ||
      !params.contentId ||
      !Object.keys(team).length ||
      team[0].members.length < 3
    ) {
      throw new HttpError(400, "Bad Requst");
    }
    const result: any = await this.scheduleService.updateSchedule(
      authorization,
      params,
      team,
    );
    if (result) return res.status(HttpStatus.OK).send(result);
  }

  // 스켸쥴 삭제
  @Delete(":groupId/:scheduleId")
  async removeSchedule(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Param("scheduleId") scheduleId: string,
    @Res() res: any,
  ) {
    await this.scheduleService.removeSchedule(
      authorization,
      groupId,
      scheduleId,
    );
    return res.status(HttpStatus.OK).send("OK");
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
