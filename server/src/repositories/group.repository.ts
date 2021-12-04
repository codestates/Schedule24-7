import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { InternalServerErrorException } from "@nestjs/common";

import { Group } from "../entities/group.entity";

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
}
