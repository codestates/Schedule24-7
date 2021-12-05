import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { InternalServerErrorException } from "@nestjs/common";

import { Group } from "../entities/group.entity";
import { User } from "src/entities/user.entity";
import { CreateConditionDto } from "src/modules/group/dto/createCondition.dto";
import { UpdateConditionDto } from "src/modules/group/dto/updateCondition.dto";

export class GroupRepository {
  constructor(
    @InjectModel(Group.name)
    private readonly groupModel: Model<Group>,
  ) {}
  // 그룹생성
  async createGroup(group: any) {
    const newGroup: any = new this.groupModel({
      groupName: group.groupName,
      groupDesc: group.groupDesc,
      groupEmoji: group.groupEmoji,
      works: group.works,
    });
    try {
      const createdGroup: any = await newGroup.save();
      return createdGroup;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // 그룹데이터 업데이트
  async updateGroup(groupId: string, group: Group) {
    const { groupName, groupDesc, groupEmoji, createdAt, works } = group;
    const updateGroupData = await this.groupModel.updateOne(
      { _id: groupId },
      {
        groupName,
        groupDesc,
        groupEmoji,
        createdAt,
        works,
      },
    );
    console.log("update");
    console.log(updateGroupData);
  }

  // 그룹 삭제
  async removeGroup(groupId: string): Promise<void> {
    await this.groupModel.deleteOne({ _id: groupId });
  }

  // 그룹 삭제를 할때 그룹에 해당하는 스케쥴 아이디가 필요
  // 기존의 조회는 헤더의 토큰 정보를 갖고 해당유저의 그룹 정보를 가져오는 식이라
  // 쓸데 없는 데이터를 많이 가져오기에 조인없이 그룹도큐먼트에서 조회
  async getScheduleIdFromGroup(groupId: string) {
    return await this.groupModel.findById(groupId).select("schedules");
  }

  // 스케쥴을 삭제시 그룹에서 스케쥴아이디 삭제
  async removeScheduleIdFromGroup(id: string, scheduleId: string) {
    await this.groupModel.updateOne(
      { _id: id },
      {
        $pull: { schedules: { _id: scheduleId } },
      },
    );
  }

  // ? 그룹아이디를 통한 그룹 조회
  async findGroupByGroupId(groupId: string): Promise<Group & { _id: any }> {
    return await this.groupModel.findById(groupId);
  }

  // ? 그룹아이디를 통한 멤버 추가
  async addMemberToGroupByGroupId(groupId: string, newMember: Group) {
    return await this.groupModel.findByIdAndUpdate(groupId, {
      $push: { members: newMember },
    });
  }

  // ? 그룹아이디를 통한 그룹 내 memberIdCount 필드 값 +1 증가
  async increaseMemberIdCountByGroupId(groupId: string) {
    return await this.groupModel.findByIdAndUpdate(groupId, {
      $inc: { memberIdCount: 1 },
    });
  }

  // ? 그룹아이디와 멤버 아이디를 통한 멤버 정보 수정
  async updateMemberByGroupAndMemberIds(
    groupId: string,
    memberId: number,
    memberData: any,
  ) {
    return await this.groupModel.findOneAndUpdate(
      {
        _id: groupId,
        members: { $elemMatch: { memberId: memberId } },
      },
      {
        $set: {
          "members.$": memberData,
        },
      },
      {
        returnDocument: "after",
      },
    );
  }

  // ? 그룹아이디와 멤버 아이디를 통한 멤버 삭제
  async removeMemberByGroupAndMemberIds(groupId: string, memberId: number) {
    return await this.groupModel.findOneAndUpdate(
      {
        _id: groupId,
      },
      {
        $pull: { members: { memberId: memberId } },
      },
      {
        returnDocument: "after",
      },
    );
  }

  // ? 그룹아이디를 통한 그룹 내 memberIdCount 필드 값 +1 증가
  async increaseConditionIdCountByGroupId(groupId: string) {
    return await this.groupModel.findByIdAndUpdate(groupId, {
      $inc: { conditionIdCount: 1 },
    });
  }

  // ? 그룹아이디로 조건 추가
  async createConditionByGroupId(
    _id: string,
    newCondition: CreateConditionDto,
  ) {
    return await this.groupModel.findByIdAndUpdate(
      _id,
      {
        $push: { conditions: newCondition },
      },
      { returnDocument: "after" },
    );
  }

  // ? 그룹아이디와 조건아이디로 기존 조건 수정
  async updateConditionByGroupAndConditionIds(
    groupId: string,
    conditionId: number,
    conditionData: UpdateConditionDto,
  ) {
    return await this.groupModel.findOneAndUpdate(
      {
        _id: groupId,
        conditions: { $elemMatch: { conditionId: conditionId } },
      },
      {
        $set: {
          "conditions.$": conditionData,
        },
      },
      {
        returnDocument: "after",
      },
    );
  }

  async removeConditionByGroupAndConditionIds(
    groupId: string,
    conditionId: number,
  ) {
    return await this.groupModel.findOneAndUpdate(
      {
        _id: groupId,
      },
      {
        $pull: { conditions: { conditionId: conditionId } },
      },
      {
        returnDocument: "after",
      },
    );
  }

  //! 멤버 리셋용 명령
  async resetMembersByGroupId(groupId: string) {
    return await this.groupModel.updateOne(
      { _id: groupId },
      { $set: { members: [], memberIdCount: 0 } },
      { returnDocument: "after" },
    );
  }
}
