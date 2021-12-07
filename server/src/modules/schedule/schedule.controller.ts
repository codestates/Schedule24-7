import {
  Controller,
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

  @Patch(":groupId/:scheduleId")
  async updateSchedule(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Param("scheduleId") scheduleId: string,
    @GetSchedule() schedule: Schedule,
    @Res() res: any,
  ) {
    const result: any = await this.scheduleService.updateSchedule(
      authorization,
      groupId,
      scheduleId,
      schedule,
    );
    if (result) {
      return res.status(HttpStatus.OK).send("Update Schedule");
    }
  }

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
}
