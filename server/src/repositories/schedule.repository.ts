import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { Schedule } from "src/entities/schedule.entity";

export class ScheduleRepository {
  constructor(
    @InjectModel(Schedule.name)
    private readonly scheduleModel: Model<Schedule>,
  ) {}

  // 스케쥴 생성

  // 스케쥴 수정
  async updateSchedule(scheduleId: string, schedule: any) {
    await this.scheduleModel.updateOne({ _id: scheduleId }, { $set: schedule });
  }
  // 스케줄 삭제
  async removeSchedule(scheduleId: string) {
    await this.scheduleModel.deleteOne({ _id: scheduleId });
  }
}
