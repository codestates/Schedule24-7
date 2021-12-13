import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

import HttpError from "src/commons/httpError";
import { Schedule } from "src/entities/schedule.entity";
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

  // 스케쥴 기본정보 수정 부분
  async modifySchedule(
    auth: string,
    groupId: string,
    scheduleId: string,
    schedule: any,
  ) {
    // 토큰 복호화해서 정보 확인
    try {
      await this.authRepository.validateToken(auth);
    } catch {
      throw new HttpError(401, "Unauthorized");
    }
    const session = await this.mongooseConnection.startSession();
    session.withTransaction(async () => {
      // 그룹 도큐먼트에 그룹아이디와 스케쥴 아이디가 있는지 확인
      const groupInfo: any =
        await this.groupRepository.checkScheduleIdFromGroup(
          groupId,
          scheduleId,
        );
      // 있으면 해당 스케쥴의 내용을 수정
      if (!groupInfo) throw new HttpError(404, "Not Found");

      await this.scheduleRepository.modifySchedule(scheduleId, schedule);
    });
    session.endSession();
    return "스케쥴 기본정보가 변경되었습니다.";
  }

  // 스케쥴 인원 배정 수정
  async updateSchedule(
    auth: string,
    params: { groupId: string; scheduleId: string; contentId: number },
    team: any,
  ) {
    // 토큰 복호화해서 정보 확인
    try {
      this.authRepository.validateToken(auth);
    } catch {
      throw new HttpError(401, "Unauthrized");
    }
    const { groupId, scheduleId, contentId } = params;
    const session = await this.mongooseConnection.startSession();
    session.withTransaction(async () => {
      // 그룹 도큐먼트에 그룹아이디와 스케쥴 아이디가 있는지 확인
      const groupInfo: any =
        await this.groupRepository.checkScheduleIdFromGroup(
          groupId,
          scheduleId,
        );
      if (!groupInfo) throw new HttpError(404, "Not Found");
      // 있으면 해당내용을 가져오기
      const contentData: any =
        await this.scheduleRepository.getScheduleFromContentId(
          scheduleId,
          Number(contentId),
        );

      // 가져온 콘텐츠 데이터의 조건이 맞는 데이터만 수정.
      contentData.forEach((content) => {
        // params로 받은 contentId와 조회결과에 있는 contentId가 같은 데이터를 찾는다.
        if (content.contentId === Number(contentId)) {
          // 동일한 값의 데이터를 찾았다면, 거기서 또 반복
          content.team.forEach((teamData) => {
            // team배열 중의 workId와 같은 아이디를 찾았다면
            if (teamData.work.workId === Number(team[0].work.workId)) {
              // team의 members의 배열만큼 요청한 멤버 데이터 값으로 할당해준다.
              // 교대만 이루어진 경우 디비상의 인원과 요청보내진 멤버의 인원이 동일한 경우
              if (teamData.members.length === team[0].members.length) {
                teamData.members.forEach((member, idx) => {
                  member.memberId = team[0].members[idx].memberId;
                  member.memberName = team[0].members[idx].memberName;
                });
                return false;
              } else if (teamData.members.length < team[0].members.length) {
                // 기존 인원에서 추가되는 경우
                // 요청된 데이터의 멤버길이에서 기존 인원수만큼 차감
                const minus = team[0].members.length - teamData.members.length;
                // 추가된 인원만 배열에서 잘라냄
                const addMember = team[0].members.slice(
                  team[0].members.length - minus,
                );
                // 추가된 인원의 배열의 길이만큼 기존인원 배열에 추가
                addMember.forEach((member) => {
                  teamData.members.push({
                    memberId: member.memberId,
                    memberName: member.memberName,
                  });
                });
                return false;
              } else {
                // 인원삭제된 경우
                // 요청된 멤버 배열 길이만큼만 데이터의 배열 추출
                const len = teamData.members.length - team[0].members.length;
                teamData.members.splice(0, len);
                teamData.members.forEach((member, idx) => {
                  member.memberId = team[0].members[idx].memberId;
                  member.memberName = team[0].members[idx].memberName;
                });
                return false;
              }
            }
          });
        }
      });
      return await this.scheduleRepository.updateSchedule(
        scheduleId,
        contentData,
      );
    });
    session.endSession();
  }

  // 스케쥴 삭제 부분
  async removeSchedule(auth: string, groupId: string, scheduleId: string) {
    try {
      // 토큰 정보 복호화
      const { _id }: any = await this.authRepository.validateToken(auth);
      await this.userRepoSitory.getUserDataById(_id);
    } catch {
      throw new HttpError(401, "Unauthorized!");
    }
    const session = await this.mongooseConnection.startSession();
    session.withTransaction(async () => {
      // 스케쥴 삭제
      await this.scheduleRepository.removeSchedule(scheduleId);
      // 그룹에 스케쥴 아이디 삭제
      await this.groupRepository.removeScheduleIdFromGroup(groupId, scheduleId);
    });
    session.endSession();
  }

  // 스케쥴 조회 부분
  async shareSchedule(scheduleId: string) {
    return await this.scheduleRepository.shareSchedule(scheduleId);
  }
}
