import {
  BadRequestException,
  InternalServerErrorException,
} from "@nestjs/common";
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

  // content 배열 생성
  createContentsForm(
    date: string,
    memberInfo: any,
    workInfo: any,
    conditionInfo,
  ) {
    const dateSplit = date.split("-").map((el) => Number(el));
    const days = new Date(dateSplit[0], dateSplit[1], 0).getDate();
    const arr = new Array(days);

    /**
     * @memberList : 근무 배정 가능한 멤버 목록(알고리즘 진행되면서 지속 갱신)
     */
    const memberList = memberInfo.slice();
    const record = {};
    const recordweekly = {};
    const recordmonthly = {};
    for (let i = 0; i < workInfo.length; i++) {
      recordweekly[workInfo[i].workName] = 0;
      recordmonthly[workInfo[i].workName] = 0;
    }

    for (let i = 0; i < memberList.length; i++) {
      const _recordweekly = Object.assign({}, recordweekly);
      const _recordmonthly = Object.assign({}, recordmonthly);
      record[memberList[i]["memberId"]] = {};

      // record 내부 각각의 멤버 객체에
      for (let key in memberList[i]) {
        if (key === "memberId") {
          continue;
        }
        record[memberList[i]["memberId"]][key] = memberList[i][key];
      }
      record[memberList[i]["memberId"]].weekly = _recordweekly;
      record[memberList[i]["memberId"]].monthly = _recordmonthly;
    }

    // ! 일자별로 반복문
    for (let i = 0; i < days; i++) {
      const newDate = {
        contentId: i + 1,
        date: new Date(2021, dateSplit[1] - 1, i + 1).toLocaleString(),
        team: [],
      };

      // team 만드는 함수
      // return result
      const team = [];
      const tempList = memberList.slice();

      // 월요일에 record 주간 근무 수 리셋
      if (new Date(newDate.date).getDay() === 1) {
        // for (let )
      }

      // ! 근무 형태 수 만큼 반복문
      for (let i = 0; i < workInfo.length; i++) {
        const members = [];

        // ! 근무 형태의 제한 인원에 맞게 인원 넣기 반복문
        for (let j = 0; j < workInfo[i].limit; j++) {
          const index = Math.round(Math.random() * (tempList.length - 1));
          try {
            const memberId = tempList[index].memberId;
            const memberName = tempList[index].memberName;
            members.push({
              memberId,
              memberName,
            });
            const workName = workInfo[i].workName;
            const _memberRecord = record[memberId];
            // console.log(_memberRecord);
            _memberRecord.weekly[workName]++;
            _memberRecord.monthly[workName]++;
            // console.log(_memberRecord.weekly[workName]);

            tempList.splice(index, 1);
          } catch {
            throw new BadRequestException(
              "근무표를 생성하기에 인원이 부족하거나 조건이 잘못 설정되어 있습니다",
            );
          }
        }
        team.push({ work: workInfo[i], members });
      }
      newDate.team = team;
      arr[i] = newDate;
    }
    console.log(record);

    return arr;
  }

  // createTeam()
}
