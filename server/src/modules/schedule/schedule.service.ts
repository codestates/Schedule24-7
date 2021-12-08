import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

import HttpError from "src/commons/httpError";
import { AuthRepository } from "src/repositories/auth.repository";
import { GroupRepository } from "src/repositories/group.repository";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { UserRepository } from "src/repositories/user.repository";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

@Injectable()
export class ScheduleService {
  constructor(
    @Inject(forwardRef(() => GroupRepository))
    private readonly groupRepository: GroupRepository,
    private readonly authRepository: AuthRepository,
    private readonly scheduleRepository: ScheduleRepository,
    private readonly userRepoSitory: UserRepository,
    @InjectConnection()
    private readonly mongooseConnection: Connection,
  ) {}

  async createSchedule(
    auth: string,
    groupId: string,
    scheduleDto: CreateScheduleDto,
  ) {
    // 요청 정보 확인
    if (!auth || !groupId || !Object.keys(scheduleDto).length) {
      throw new HttpError(400, "Bad Requst");
    }
    // 토큰 복호화해서 정보 확인
    const { _id }: any = await this.authRepository.validateToken(auth);
    const userInfo: any = await this.userRepoSitory.getUserDataById(_id);
    if (!Object.keys(userInfo).length) throw new HttpError(401, "Unauthorized");

    // 멤버 정보, 조건 정보, 근무 정보 조회
    const memberInfo: any = await this.groupRepository.getMemberByGroupId(
      groupId,
    );
    const conditionInfo: any = await this.groupRepository.getConditionByGroupId(
      groupId,
    );
    const workInfo: any = await this.groupRepository.getWorkByGroupId(groupId);
    if (
      !Object.keys(memberInfo).length ||
      !Object.keys(conditionInfo).length ||
      !Object.keys(workInfo).length
    )
      throw new HttpError(404, "Not Found: 멤버, 조건, 일의 정보가 없음");
    // 조회한 정보를 통해 콘텐츠(스켸줄) 생성
    const contents = this.scheduleRepository.createContentsForm(
      scheduleDto.period,
      memberInfo.members,
      workInfo.works,
      conditionInfo.conditions,
    );
    // 요청한 정보, 그룹정보(아이디, 그룹명), 콘텐츠를 디비에 저장
    const group: object = { groupId: groupId, groupName: memberInfo.groupName };
    const result: any = await this.scheduleRepository.createSchedule(
      scheduleDto,
      group,
      contents,
    );
    if (result) {
      const pushScheduleId: any =
        await this.groupRepository.pushScheduleIdfromGroup(groupId, result._id);
      if (pushScheduleId) return result;
    }

    // 1. 그냥 멤버 안 넣고 날짜랑 id 값만 박혀 있는 스케줄 콘텐츠 뽑기 => 지금
    // 2. 멤버를 조건 없이 랜덤으로 넣은 스케줄 콘텐츠 뽑기
    // 3. 조건을 넣어서 나온 스케줄 콘텐츠 뽑기
  }

  // 스케쥴 멤버 변경 수정 부분
  async updateSchedule(
    auth: string,
    groupId: string,
    scheduleId: string,
    schedule: any,
  ) {
    const session = await this.mongooseConnection.startSession();
    session.withTransaction(async () => {
      // 요청 정보 확인
      if (!auth || !groupId || !scheduleId || !Object.keys(schedule).length) {
        throw new HttpError(400, "Bad Requst");
      }
      // 토큰 복호화해서 정보 확인
      const { _id }: any = await this.authRepository.validateToken(auth);
      const userInfo: any = await this.userRepoSitory.getUserDataById(_id);
      if (!userInfo) throw new HttpError(401, "Unauthorized");
      // 그룹 도큐먼트에 그룹아이디와 스케쥴 아이디가 있는지 확인
      const groupInfo: any = await this.groupRepository.getScheduleIdFromGroup;
      // 있으면 해당 스케쥴의 내용을 수정
      if (!groupInfo) {
        throw new HttpError(404, "Not Found");
      } else {
        const updateSchedule = await this.scheduleRepository.updateSchedule(
          scheduleId,
          schedule,
        );
        return updateSchedule;
      }
    });
    session.endSession();
  }

  // 스케쥴 삭제 부분
  async removeSchedule(auth: string, groupId: string, scheduleId: string) {
    const session = await this.mongooseConnection.startSession();
    session.withTransaction(async () => {
      // 요청 정보 확인
      if (!auth || !groupId || !scheduleId) {
        throw new HttpError(400, "Bad Requst");
      } else {
        // 토큰 정보 복호화
        const { _id }: any = await this.authRepository.validateToken(auth);
        const userInfo: any = await this.userRepoSitory.getUserDataById(_id);
        // 토큰 정보 확인
        if (!Object.keys(userInfo).length)
          throw new HttpError(401, "Unauthorizied!");
        // 그룹에 스케쥴 아이디 삭제
        await this.groupRepository.removeScheduleIdFromGroup(
          groupId,
          scheduleId,
        );
        // 스케쥴 삭제
        return await this.scheduleRepository.removeSchedule(scheduleId);
      }
    });
    session.endSession();
  }

  // 스케쥴 조회 부분
  async shareSchedule(scheduleId: string) {
    return await this.scheduleRepository.shareSchedule(scheduleId);
  }
}
