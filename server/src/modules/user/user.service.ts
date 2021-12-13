import { Injectable } from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Connection } from "mongoose";

import HttpError from "src/commons/httpError";
import {
  conditionInfoList,
  generateGuestUserInfo,
  guestGroupInfo,
  membersInfoList,
} from "src/public/guestUserData";
import { AuthRepository } from "src/repositories/auth.repository";
import { GroupRepository } from "src/repositories/group.repository";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { UserRepository } from "src/repositories/user.repository";
import { CreateUserDto } from "./dto/request/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
    private readonly groupRepository: GroupRepository,
    private readonly scheduleRepository: ScheduleRepository,
  ) {}

  // 회원가입
  async createUser(createUserDto: CreateUserDto) {
    // encode password
    const salt: string = await bcrypt.genSalt(10);
    const password: string = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = password;

    const createdUser = await this.userRepository.createUser(createUserDto);
    return createdUser;
  }
  // 정보조회
  // 유저 정보 조회(패스워드를 제외한 전부)
  async getUserInfoAll(auth: string) {
    if (!auth) throw new HttpError(400, "Bad Request");
    try {
      const { _id }: any = await this.authRepository.validateToken(auth);
      return await this.userRepository.getUserDataById(_id);
    } catch {
      throw new HttpError(401, "Unauthorized");
    }
  }

  // 비밀번호 변경
  async updatePassword(auth: string, new_password: string) {
    let _id;
    try {
      _id = this.authRepository.validateToken(auth);
    } catch {
      throw new HttpError(401, "Unauthorized");
    }

    const session = await this.mongoConnection.startSession();
    await session.withTransaction(async () => {
      const salt: string = await bcrypt.genSalt(10);
      const password: string = await bcrypt.hash(new_password, salt);
      return await this.userRepository.updateUserPassword(_id, password);
    });
    session.endSession();
  }

  // 회원탈퇴
  async signOut(auth: string) {
    const session = await this.mongoConnection.startSession();
    await session.withTransaction(async () => {
      const data: any = await this.authRepository.validateToken(auth);
      const { _id } = data;
      if (!_id) throw new HttpError(401, "Unauthorized");
      const result: any = await this.userRepository.signOut(_id);
      if (!result) throw new HttpError(404, "Not Found");
      else return result;
    });
    session.endSession();
  }

  /**
   * * 게스트 계정 생성
   * * POST /users/guest
   * 서버 내 기록해둔 더미데이터로 게스트 계정 생성,
   * 계정 생성 후, 사전 지정된 더미데이터로 멤버, 조건 등의 기본 데이터 업데이트
   * 업데이트까지 완료 후 해당 게스트 계정의 엑세스 토큰 전달
   * @returns
   */
  async createGuest() {
    const userData = await this.userRepository.createUser(
      generateGuestUserInfo(),
    );

    const userOId = userData._id.toString();

    const groupData = await this.groupRepository.createGroup(guestGroupInfo);

    await this.userRepository.addGroupIdFromGroup(userOId, groupData);

    const groupOId = groupData._id.toString();

    membersInfoList.forEach(async (member) => {
      const IdCount: any =
        await this.groupRepository.increaseMemberIdCountByGroupId(groupOId);
      const newMember = Object.assign(
        {},
        { memberId: IdCount.memberIdCount },
        member,
      );
      await this.groupRepository.addMemberToGroupByGroupId(groupOId, newMember);
    });

    conditionInfoList.forEach(async (condition) => {
      const IdCount: any =
        await this.groupRepository.increaseConditionIdCountByGroupId(groupOId);
      const newCondition = Object.assign(
        {},
        {
          conditionId: IdCount.conditionIdCount,
        },
        condition,
      );
      await this.groupRepository.createConditionByGroupId(
        groupOId,
        newCondition,
      );
    });

    const accessToken = this.authRepository.generateToken(userData);
    setTimeout(
      () => this.removeGuest(`Bearer ${accessToken.accessToken}`),
      1000 * 60 * 2,
    );

    return accessToken;
  }

  // 게스트 삭제
  async removeGuest(authorization: string) {
    const tokenData = this.authRepository.validateToken(authorization);
    const userData = await this.userRepository.getUserDataById(tokenData._id);

    userData.groups.forEach(async (group) => {
      const groupOId = group.toString();
      const { schedules }: any =
        await this.groupRepository.getScheduleIdFromGroup(groupOId);

      schedules.forEach(async (schedule: string) => {
        const scheduleOId = schedule.toString();
        await this.scheduleRepository.removeSchedule(scheduleOId);
      });

      await this.groupRepository.removeGroup(groupOId);
    });

    await this.userRepository.signOut(tokenData._id);
    return "유저 정보가 정상적으로 삭제 되었습니다.";
  }
}
