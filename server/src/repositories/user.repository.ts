import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ConflictException, NotFoundException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../modules/user/dto/request/create-user.dto";
import { group } from "console";

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  // 회원생성
  async createUser(createUserDto: CreateUserDto) {
    const { email, userId, password, userName } = createUserDto;
    // 동일한 이메일이 있는지 확인
    const userInfo = await this.getUserByEmail(email);
    // 동일한 정보가 없는 경우 정보 등록
    if (!userInfo) {
      const newUser: any = new this.userModel({
        userId,
        email,
        password,
        userName,
      });

      const createdUser: any = await newUser.save();
      return createdUser;
    } else {
      throw new ConflictException("Conflic Email");
    }
  }
  // 동일한 유저 아이디 체크
  async getUserByUserId(userId: string) {
    const user: any = await this.userModel.findOne({ userId });
    return user;
  }

  // 동일한 이메일 체크
  async getUserByEmail(email: string) {
    const user: any = await this.userModel.findOne({ email }).exec();

    return user;
  }
  // 유저 데이터 조회(패스워드 제외한)
  async getUserDataById(id: string) {
    const user: any = await this.userModel
      .findById({ _id: id })
      .select("-password");
    if (!user) throw new NotFoundException("Not Found");
    console.log(user);
    return user;
  }

  // 유저 정보 조회(유저아이디, 이메일, 유저이름) - 마아페이지
  async getUserInfoById(id: string) {
    const user: any = await this.userModel
      .findById(id)
      .select("userId, email, userName");
    if (!user) throw new NotFoundException("Not Found UserInfo");
    return user;
  }

  // 비밀 번호 수정
  async updateUserPassword(id: string, new_password: string) {
    const updateUser: any = await this.userModel.findByIdAndUpdate(
      { _id: id },
      {
        $set: { password: new_password },
      },
    );
    if (!updateUser) throw new NotFoundException("Not Found");
    return updateUser;
  }
  // 회원탈퇴
  async remove(id: string) {
    const result: any = await this.userModel.remove({ _id: id });
    if (!result) throw new NotFoundException("Not Found");
  }
  // 신규 그룹 생성시 유저에 그룹 objectId 추가
  async addGroupIdFromGroup(id: string, group: any) {
    // 해당 유저로 생성한 그룹아이디를 추가한다.
    const updateUser: any = await this.userModel.updateOne(
      { _id: id },
      {
        $push: { groups: { _id: group._id } },
      },
    );
    if (!updateUser) throw new NotFoundException("Not Found");
    return updateUser;
  }

  // 그룹 삭제시 해당유저의 그룹아이디도 삭제
  async removeGroupFromUser(_id: any, groupId: string): Promise<void> {
    await this.userModel.updateOne(
      { _id },
      {
        $pull: { groups: { _id: groupId } },
      },
    );
  }
  // 유저의 비밀번호 가져오기 - 비밀번호 일치
  async getUserPasswordById(id: string) {
    const userData: any = await this.userModel.findById(id).select("password");
    if (!userData) throw new NotFoundException("Not Found");
    return userData.password;
  }

  // 해당 유저의 그룹 정보 조회
  async getGroup(id: string) {
    const result: any = await this.userModel.findById(id).populate("groups");
    return result;
  }

  // 해당 유저가 그룹 아이디를 가졌는지 확인.
  async getUserGroupId(id: string, groupId: string): Promise<boolean> {
    const userData: any = await this.userModel
      .findOne({
        $and: [{ _id: id }, { $oid: groupId }],
      })
      .select("groups");
    return userData.groups.length ? true : false;
  }
}
