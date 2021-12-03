import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

import { ConflictException, NotFoundException } from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../modules/user/dto/request/create-user.dto";
import { FindUserIdDto } from "src/modules/user/dto/request/find-userId.dto";
import { FindPasswordDto } from "src/modules/user/dto/request/find-password.dto";

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  // 회원생성
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, userId, password, userName } = createUserDto;
    // 동일한 이메일이 있는지 확인
    const userInfo = await this.getUserByEmail(email);
    // 동일한 정보가 없는 경우 정보 등록
    if (userInfo.email !== createUserDto.email) {
      const newUser: any = new this.userModel({
        userId,
        email,
        password,
        userName,
      });

      const createdUser: any = await newUser.save();
      return createdUser;
    }
  }
  // 동일한 유저 아이디 체크
  async getUserByUserId(userId: string): Promise<User> {
    const user: any = await this.userModel.findOne({ userId });
    return user;
  }

  // 동일한 이메일 체크
  async getUserByEmail(email: string): Promise<User> {
    const user: any = await this.userModel.findOne({ email }).exec();

    return user;
  }
  // 유저 데이터 조회(패스워드 제외한)
  async getUserDataById(id: string): Promise<object> {
    const user: any = await this.userModel.findById(id).select("-password");
    if (!user) throw new NotFoundException("Not Found");
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
    const updateUser: any = await this.userModel.findByIdAndUpdate(id, {
      $set: { password: new_password },
    });
    if (!updateUser) throw new NotFoundException("Not Found");
    return updateUser;
  }
  // 회원탈퇴
  async remove(id: string): Promise<void> {
    const result: any = await this.userModel.remove({ _id: id });
    if (!result) throw new NotFoundException("Not Found");
  }
  // 신규 그룹 생성시 유저에 그룹 objectId 추가
  async addGroupIdFromGroup(id: string, group: any): Promise<User> {
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

  // 유저의 비밀번호 가져오기 - 비밀번호 일치
  async getUserPasswordById(id: string) {
    const userData: any = await this.userModel.findById(id).select("password");
    if (!userData) throw new NotFoundException("Not Found");
    return userData.password;
  }

  // 유저 정보 조회(유저이름, 이메일) - 유저 아이디 찾기
  async findUserId(dto: FindUserIdDto): Promise<User> {
    const { email, userName } = dto;
    const userData: any = await this.userModel
      .findOne({ email: email, userName: userName })
      .select("userId");
    if (!userData) throw new NotFoundException("Not Found");
    return userData;
  }
  // 유저 정보 조회(유저이름, 이메일, 유저 아이디) - 유저 비밀번호 찾기
  async findPassword(dto: FindPasswordDto): Promise<User> {
    const { email, userName, userId } = dto;
    const userData: any = await this.userModel.findOne({
      email: email,
      userName: userName,
      userId: userId,
    });
    if (!userData) throw new NotFoundException("Not Found");
    return userData;
  }
}
