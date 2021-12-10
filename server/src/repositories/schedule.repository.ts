import { InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import HttpError from "src/commons/httpError";

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

  // 스케쥴 기본 정보 수정
  async modifySchedule(scheduleId: string, schedule: any) {
    const result = await this.scheduleModel.updateOne(
      { _id: scheduleId },
      { $set: schedule },
    );
    return result;
  }

  // 스케쥴 인원 변경을 위한 데이터 조회
  async getScheduleFromContentId(scheduleId: string, contentId: number) {
    const result: any = await this.scheduleModel.findOne({
      $and: [
        { _id: scheduleId },
        {
          contents: {
            $elemMatch: {
              contentId: contentId,
            },
          },
        },
      ],
    });
    const { contents } = result;
    return contents;
  }

  // 스케쥴상 기존 근무자 변경
  async updateSchedule(scheduleId: string, contentData: any) {
    const result: any = await this.scheduleModel.updateOne(
      { _id: scheduleId },
      { $set: { contents: contentData } },
    );
    return result;
  }

  // 스케줄 삭제
  async removeSchedule(scheduleId: string) {
    const result: any = await this.scheduleModel.deleteOne({ _id: scheduleId });
    return result;
  }

  // 스케쥴 조회(공유)
  async shareSchedule(scheduleId: string) {
    return await this.scheduleModel.findOne({ _id: scheduleId });
  }

  // content 배열 생성
  createContentsForm(
    date: string,
    memberInfo: any,
    workInfo: any,
    conditionInfo,
  ) {
    /**
     * @memberList : 근무 배정 가능한 멤버 목록(알고리즘 진행되면서 지속 갱신)
     */
    const memberList = memberInfo.slice();
    const record = {};

    // ! 주간과 월간 레코드 기본 셋 설정
    const recordweekly = {};
    const recordmonthly = {};
    for (let i = 0; i < workInfo.length; i++) {
      recordweekly[workInfo[i].workId] = 0;
      recordmonthly[workInfo[i].workId] = 0;
    }

    // ! 근무 레코드 생성
    for (let i = 0; i < memberList.length; i++) {
      const _recordweekly = Object.assign({}, recordweekly);
      const _recordmonthly = Object.assign({}, recordmonthly);
      record[memberList[i]["memberId"]] = {};

      //! record 내부 각각의 멤버 객체에
      for (const key in memberList[i]) {
        if (key === "memberId") {
          continue;
        }
        record[memberList[i]["memberId"]][key] = memberList[i][key];
      }
      record[memberList[i]["memberId"]].weekly = _recordweekly;
      record[memberList[i]["memberId"]].monthly = _recordmonthly;
      record[memberList[i]["memberId"]].total = 0;
    }

    const dateSplit = date.split("-").map((el) => Number(el));
    const days = new Date(dateSplit[0], dateSplit[1], 0).getDate();
    const arr = new Array(days);

    // ! 일자별로 반복문
    for (let i = 0; i < days; i++) {
      const newDate = {
        contentId: i + 1,
        date: new Date(dateSplit[0], dateSplit[1] - 1, i + 1).toLocaleString(),
        team: [],
      };

      const team = [];
      const tempList = memberList.slice();

      // ! 체크 코드
      // if (
      //   new Date(newDate.date).getDay() === 0 ||
      //   new Date(newDate.date) === new Date(dateSplit[0], dateSplit[1], days)
      // ) {
      //   console.log(record);
      // }

      // * 월요일에 record 주간 근무 수 리셋
      if (new Date(newDate.date).getDay() === 1) {
        for (const memberId in record) {
          for (const workId in record[memberId].weekly) {
            record[memberId].weekly[workId] = 0;
          }
        }
      }

      // ! 근무 조건 적용 구간
      // ? [조건을 배열 형태로 받아서 하나씩 해독시키는 작업]
      // 1. 조건을 해독
      // 2. 해독한 조건으로 Templist 수정
      // 배열로 온 조건들 하나씩 확인하는 반복문
      // tempList에 있는 것들을 하나씩 대조... 반복문
      for (const condition of conditionInfo) {
        // 주기 설정
        const conditionCycle = condition.cycle;
        // 대상되는 근무
        const conditionWorkId = condition.workId;
        const conditionOperator = condition.operation;
        const conditionValue = condition.value;
        for (let i = 0; i < tempList.length; i++) {
          const _memberId = tempList[i].memberId;
          const _targetWork =
            record[_memberId][conditionCycle][conditionWorkId];
          if (conditionOperator === "<") {
            if (_targetWork >= conditionValue - 1) {
              const result = tempList.splice(i, 1);
              console.log(conditionWorkId, result);
              console.log(record);
            }
          }
          // else if (conditionOperator === ">") {
          //   if (_targetWork )

          // } else if (conditionOperator === "=") {

          // }
        }
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
            const workId = workInfo[i].workId;
            const _memberRecord = record[memberId];
            // console.log(_memberRecord);
            _memberRecord.weekly[workId]++;
            _memberRecord.monthly[workId]++;
            _memberRecord.total++;
            // console.log(_memberRecord.weekly[workName]);

            tempList.splice(index, 1);
          } catch {
            throw new HttpError(
              400,
              "근무표를 생성하기에 인원이 부족하거나 조건이 잘못 설정되어 있습니다. 그룹의 근무에 필요한 인원 수와 멤버 수, 스케줄 생성 조건을 확인해주세요",
            );
          }
        }
        team.push({ work: workInfo[i], members });
      }
      newDate.team = team;
      arr[i] = newDate;
    }
    // console.log(record);

    return arr;
  }

  // createTeam()
}
