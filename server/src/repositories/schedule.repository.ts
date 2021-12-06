import { InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Schedule } from "src/entities/schedule.entity";
import { CreateScheduleDto } from "src/modules/schedule/dto/create-schedule.dto";

export class ScheduleRepository {
  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<Schedule>,
  ) {}

  // 스케쥴 생성
  async createSchedule(
    scheduleDto: CreateScheduleDto,
    group: any,
    contents: any,
  ) {
    const newSchedule: any = new this.scheduleModel({
      scheduleName: scheduleDto.scheduleName,
      scheduleEmoji: scheduleDto.scheduleEmoji,
      period: scheduleDto.period,
      group: group,
      contents: contents,
    });
    try {
      const createdSchedule: any = await newSchedule.save();
      return createdSchedule;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  // 스케쥴 수정
  async updateSchedule(scheduleId: string, schedule: any) {
    await this.scheduleModel.updateOne({ _id: scheduleId }, { $set: schedule });
  }
  // 스케줄 삭제
  async removeSchedule(scheduleId: string) {
    await this.scheduleModel.deleteOne({ _id: scheduleId });
  }
}
