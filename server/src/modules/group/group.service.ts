import { forwardRef, Inject, Injectable } from "@nestjs/common";
import * as csv from "csvtojson";
import HttpError from "src/commons/httpError";
import * as fs from "fs";
import { InjectConnection } from "@nestjs/mongoose";
import { Connection } from "mongoose";

import { Group } from "src/entities/group.entity";
import { AuthRepository } from "src/repositories/auth.repository";
import { GroupRepository } from "src/repositories/group.repository";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { UserRepository } from "src/repositories/user.repository";
import { CreateConditionDto } from "./dto/request/createCondition.dto";
import { UpdateConditionDto } from "./dto/request/updateCondition.dto";
import { CreateGroupReqDto } from "./dto/request/createGroup.dto";
import { UpdateGroupReqDto } from "./dto/request/updateGroup.dto";
import { CreateMemberReqDto } from "./dto/request/createMember.dto";

@Injectable()
export class GroupService {
  constructor(
    @Inject(forwardRef(() => ScheduleRepository))
    private readonly scheduleRepository: ScheduleRepository,
    private readonly groupRepository: GroupRepository,
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository,
    @InjectConnection()
    private readonly mongoConnection: Connection,
  ) {}

  // 신규 그룹 추가
  async createGroup(auth: string, group: CreateGroupReqDto) {
    // 요청된 그룹데이터를 받아서 그룹도큐먼트에 저장
    let authInfo: any;
    try {
      // 제대로 된 토큰인가?
      authInfo = this.authRepository.validateToken(auth);
    } catch {
      throw new HttpError(401, "Unauthorized");
    }
    const { _id } = authInfo;
    // 그룹 생성
    const createdGroup: any = await this.groupRepository.createGroup(group);
    // 그룹 생성 성공시
    if (createdGroup) {
      // user에 그룹스 필드에 그룹 아이디 추가
      await this.userRepository.addGroupIdFromGroup(_id, createdGroup);
    }
  }

  // 그룹 정보 조회
  async getGroup(auth: string) {
    let authInfo: any;
    try {
      // 토큰 정보 확인
      authInfo = this.authRepository.validateToken(auth);
    } catch {
      throw new HttpError(401, "Unauthorized");
    }
    const { _id } = authInfo;
    // user의 오브젝트 아이디로 유저의 그룹, 스케쥴 정보 가져오기
    const { groups }: any = await this.userRepository.getGroup(_id);
    if (!groups.length) return null;
    return groups;
  }

  // 그룹 정보 수정
  async updateGroup(auth: string, groupId: string, group: UpdateGroupReqDto) {
    let authInfo: any;
    try {
      // 요청이 제대로 왔다면
      authInfo = await this.authRepository.validateToken(auth);
    } catch {
      throw new HttpError(401, "Unauthorized");
    }
    const { _id } = authInfo;

    const session = await this.mongoConnection.startSession();
    session.withTransaction(async () => {
      // 해당 그룹의 소유자인 유저인가?
      const flag: boolean = await this.userRepository.getUserGroupId(
        _id,
        groupId,
      );

      // 있다면
      if (flag) await this.groupRepository.updateGroup(groupId, group);
      // 없다면
      else throw new HttpError(401, "Unauthorized");
    });
    session.endSession();
  }

  /**
   *
   * @param auth
   * @param groupId
   *
   * - 해당 그룹을 삭제한다는 것은
   * 그 그룹을 소유한 유저의 그룹아이디 정보를 삭제하고
   * 해당 그룹이 가지고 있는 스케쥴 데이터도 삭제한다는 것.
   *   - user의 groups의 해당 그룹 아이디 삭제
   *   - 해당하는 schedule 정보 삭제.
   *   - 그룹 정보 삭제
   */
  async removeGroup(auth: string, groupId: string) {
    let authInfo: any;
    try {
      // 토큰 정보 확인
      authInfo = await this.authRepository.validateToken(auth);
    } catch {
      throw new HttpError(401, "Unauthorized");
    }
    const { _id } = authInfo;
    const session = await this.mongoConnection.startSession();
    session.withTransaction(async () => {
      // 해당 유저가 갖고 있는 유저의 해당 그룹 아이디 정보 삭제
      await this.userRepository.removeGroupFromUser(_id, groupId);

      // 해당 그룹이 갖고 있는 스케쥴을 삭제하기 위해 그룹 도큐먼트에서 스켸쥴 아이디만 조회
      const { schedules }: any =
        await this.groupRepository.getScheduleIdFromGroup(groupId);
      // 해당 스케쥴 삭제
      schedules.forEach(async (scheduleId) => {
        await this.scheduleRepository.removeSchedule(scheduleId);
      });
      // 해당 그룹 삭제
      await this.groupRepository.removeGroup(groupId);
    });
    session.endSession();
  }

  // ! 멤버 정보 초기화
  // * DELETE "/memeber/:groupId" 연결
  async resetMember(groupId: string) {
    return this.groupRepository.resetMembersByGroupId(groupId);
  }

  // ? 새로운 멤버 추가
  // * POST "/member/:groupId" 연결
  async createMember(
    authorization: string,
    member: CreateMemberReqDto,
    groupId: string,
  ) {
    // * 토큰 유효성 검사
    try {
      this.authRepository.validateToken(authorization);
    } catch (err) {
      throw new HttpError(401, err.message);
    }

    // * 멤버간 Id 값 중복을 피하기 위해 memberIdCount +1 증가 및 기존 IdCount 값 추출
    const IdCount: Group =
      await this.groupRepository.increaseMemberIdCountByGroupId(groupId);

    if (!IdCount) throw new HttpError(400, "groupId 값이 올바르지 않습니다");

    // * memberIdCount 최신 값으로 memberId 값 설정
    const newMember: any = Object.assign(
      {},
      { memberId: IdCount.memberIdCount },
      member,
    );
    // * 그룹 아이디로 그룹 조회하여 멤버 추가
    const result = await this.groupRepository.addMemberToGroupByGroupId(
      groupId,
      newMember,
    );
    if (!result) {
      throw new HttpError(500, "업데이트가 정상적으로 완료되지 않았습니다.");
    } else {
      return "업데이트가 정상적으로 완료되었습니다.";
    }
  }

  // ? 기존 멤버 편집
  // * PATCH "/member/:groupId/:memberId" 연결
  async updateMember(
    authorization: string,
    params: { groupId: string; memberId: number },
    memberData: any,
  ) {
    // * 토큰 유효성 검사
    try {
      this.authRepository.validateToken(authorization);
    } catch (err) {
      throw new HttpError(401, err.message);
    }

    // * 전달되는 memberId 숫자 값으로 변형 후 업데이트 데이터에 저장
    params.memberId = Number(params.memberId);
    memberData.memberId = params.memberId;

    // * DB상 업데이트 진행
    const result = await this.groupRepository.updateMemberByGroupAndMemberIds(
      params.groupId,
      params.memberId,
      memberData,
    );

    if (!result) {
      throw new HttpError(500, "업데이트가 완료되지 않았습니다.");
    } else {
      return "업데이트가 정상적으로 완료되었습니다.";
    }
  }

  // ? 기존 멤버 삭제
  // * DELETE "/member/:groupId/:memberId" 연결
  async removeMember(
    authorization: string,
    params: { groupId: string; memberId: number },
  ) {
    // * 토큰 유효성 검사
    try {
      this.authRepository.validateToken(authorization);
    } catch (err) {
      throw new HttpError(401, err.message);
    }

    // * memberId 숫자형으로 변환 후 재할당
    params.memberId = Number(params.memberId);

    const result = await this.groupRepository.removeMemberByGroupAndMemberIds(
      params.groupId,
      params.memberId,
    );

    if (!result) {
      throw new HttpError(500, "삭제가 완료되지 않았습니다.");
    } else {
      return "삭제가 정상적으로 완료되었습니다.";
    }
  }

  /**
   * ? 새로운 조건 추가
   * * POST /condition/:groupId
   * @param authorization
   * @param groupId
   * @param condition
   * @returns
   */
  async createCondition(
    authorization: string,
    groupId: string,
    condition: CreateConditionDto,
  ) {
    // * 토큰 유효성 검사
    try {
      this.authRepository.validateToken(authorization);
    } catch (err) {
      throw new HttpError(401, err.message);
    }

    // * 조건간 Id 값 중복을 피하기 위해 conditionIdCount +1 증가 및 기존 conditionIdCount 값 추출
    const IdCount =
      await this.groupRepository.increaseConditionIdCountByGroupId(groupId);

    if (!IdCount) throw new HttpError(401, "groupId 값이 올바르지 않습니다.");

    // * 추가될 신규 조건에 conditionId 값 추가
    const newCondition: CreateConditionDto = Object.assign({}, condition, {
      conditionId: IdCount.conditionIdCount,
    });

    // * condition 추가 진행
    const result = await this.groupRepository.createConditionByGroupId(
      groupId,
      newCondition,
    );

    if (!result) {
      throw new HttpError(500, "조건 추가가 정상적으로 이루어지지 않았습니다");
    } else {
      return "조건 추가가 완료되었습니다";
    }
  }

  /**
   * ? 기존 조건 수정
   * * PATCH /condition/:groupId/:conditionId
   * @param authorization
   * @param params
   * @param conditionData
   * @returns
   */
  async updateCondition(
    authorization: string,
    params: { groupId: string; conditionId: number },
    conditionData: UpdateConditionDto,
  ) {
    // * 토큰 유효성 검사
    try {
      this.authRepository.validateToken(authorization);
    } catch (err) {
      throw new HttpError(401, err.message);
    }

    // * 전달된 conditionId 타입 Number Type으로 수정
    params.conditionId = Number(params.conditionId);
    conditionData.conditionId = params.conditionId;

    // * condition 업데이트 내용 DB 반영
    const result =
      await this.groupRepository.updateConditionByGroupAndConditionIds(
        params.groupId,
        params.conditionId,
        conditionData,
      );

    if (!result) {
      throw new HttpError(500, "조건 추가가 정상적으로 이루어지지 않았습니다");
    } else {
      return "조건 추가가 완료되었습니다";
    }
  }

  /**
   * ? 기존 조건 삭제
   * * DELETE /condition/:groupId/:conditionId
   * @param authorization
   * @param params
   * @returns
   */
  async removeCondition(
    authorization: string,
    params: { groupId: string; conditionId: number },
  ) {
    // * 토큰 유효성 검사
    try {
      this.authRepository.validateToken(authorization);
    } catch (err) {
      throw new HttpError(401, err.message);
    }

    // * 전달된 conditionId 타입 Number Type으로 수정
    params.conditionId = Number(params.conditionId);

    const result =
      await this.groupRepository.removeConditionByGroupAndConditionIds(
        params.groupId,
        params.conditionId,
      );

    if (!result) {
      throw new HttpError(500, "조건 삭제가 정상적으로 이루어지지 않았습니다");
    } else {
      return "조건 삭제가 완료되었습니다";
    }
  }

  // csv파일을 이용한 그룹에 멤버추가
  // csv 파일 json 파일로 변환
  async pushToMember(file: any, auth: string, groupId: string) {
    // 유효성 검증
    try {
      this.authRepository.validateToken(auth);
    } catch (err) {
      throw new HttpError(401, err.message);
    }
    // 보내온 파일에 업로드 경로 읽어오기
    const csvFilePath = process.cwd() + "/" + file.path;
    // csv 파일 json 파일로 변경
    const csvToJson = await csv({
      noheader: true,
      trim: true,
      headers: ["memberName", "memberPosition", "memberVacation"],
    }).fromFile(csvFilePath);
    // 첫번째 행 삭제
    csvToJson.shift();
    // memberVacation의 문자열 값 => 배열로 변경
    csvToJson.forEach((el) => {
      const _memberVacation = el.memberVacation.replace(/ /g, "").split(",");
      el.memberVacation = _memberVacation;
    });
    // 배열의 크기만큼 멤버추가
    csvToJson.forEach(async (member) => {
      const IdCount: any =
        await this.groupRepository.increaseMemberIdCountByGroupId(groupId);
      if (!IdCount) throw new HttpError(400, "groupId 값이 올바르지 않습니다.");

      // memberIdCount 최시값으로 memberId 값 설정
      const newMember: any = Object.assign(
        {},
        { memberId: IdCount.memberIdCount },
        member,
      );

      // 그룹 아이디로 그룹 조회하여 멤버추가
      const result = await this.groupRepository.addMemberToGroupByGroupId(
        groupId,
        newMember,
      );
      if (!result)
        throw new HttpError(500, "멥버가 정상적으로 추가되지 않았습니다.");
    });

    // csv 폴더 안에 파일 있을 경우 파일 삭제
    if (fs.existsSync(csvFilePath)) fs.unlinkSync(csvFilePath);
    return "멤버가 정상적으로 추가되었습니다.";
  }
}
