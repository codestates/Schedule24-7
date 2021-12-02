import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";

import { Group } from "../entities/group.entity";

export class GroupRepository {
  constructor(
    @InjectModel(Group.name) private readonly groupModel: Model<Group>,
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
}
