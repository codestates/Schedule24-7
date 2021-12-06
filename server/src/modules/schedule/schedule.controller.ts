import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  Header,
  Headers,
  HttpStatus,
  InternalServerErrorException,
} from "@nestjs/common";
import { Connection } from "mongoose";
import { InjectConnection } from "@nestjs/mongoose";

import { ScheduleService } from "./schedule.service";
import { GetSchedule } from "src/commons/decorator.dto";
import { Schedule } from "src/entities/schedule.entity";
import { CreateScheduleDto } from "./dto/create-schedule.dto";

@Controller("schedule")
export class ScheduleController {
  constructor(
    @InjectConnection()
    private readonly mongooseConnection: Connection,
    private readonly scheduleService: ScheduleService,
  ) {}

  @Post(":groupId")
  async createSchedule(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Body() scheduleDto: CreateScheduleDto,
    @Res() res: any,
  ) {
    const session = await this.mongooseConnection.startSession();
    session.startTransaction();
    try {
      const result: any = await this.scheduleService.createSchedule(
        authorization,
        groupId,
        scheduleDto,
      );
      if (result) {
        await session.commitTransaction();
        return res.status(HttpStatus.CREATED).send("Create Schedule");
      }
    } catch {
      await session.abortTransaction();
      throw new InternalServerErrorException("Internal Server Error");
    } finally {
      session.endSession();
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
    const session = await this.mongooseConnection.startSession();
    session.startTransaction();
    try {
      const result: any = await this.scheduleService.updateSchedule(
        authorization,
        groupId,
        scheduleId,
        schedule,
      );
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send("Update Schedule");
    } catch (e) {
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  }

  @Delete(":groupId/:scheduleId")
  async removeSchedule(
    @Headers("Authorization") authorization: string,
    @Param("groupId") groupId: string,
    @Param("scheduleId") scheduleId: string,
    @Res() res: any,
  ) {
    const session = await this.mongooseConnection.startSession();
    session.startTransaction();
    try {
      await this.scheduleService.removeSchedule(
        authorization,
        groupId,
        scheduleId,
      );
      await session.commitTransaction();
      return res.status(HttpStatus.OK).send("OK");
    } catch {
      await session.abortTransaction();
      throw new InternalServerErrorException("Internal Server Error");
    } finally {
      session.endSession();
    }
  }
}
