import { Injectable, InternalServerErrorException } from "@nestjs/common";

import { GroupRepository } from "src/repositories/group.repository";

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async createGroup(group: any) {
    // 요청된 그룹데이터를 받아서 그룹도큐먼트에 저장
    try {
      const createdGroup: any = await this.groupRepository.createGroup(group);
      return createdGroup;
    } catch (err) {
      throw new InternalServerErrorException("Not Created");
    }
  }

  // findAll() {
  //   return `This action returns all group`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} group`;
  // }

  // update(id: number, updateGroupDto: UpdateGroupDto) {
  //   return `This action updates a #${id} group`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} group`;
  // }
}
