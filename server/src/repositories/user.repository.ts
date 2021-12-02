import { InjectModel } from "@nestjs/mongoose";
import { Model, Schema as MongooseSchema } from "mongoose";

import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { User } from "../entities/user.entity";
import { CreateUserDto } from "../modules/user/dto/request/create-user.dto";
import { FindUserIdDto } from "src/modules/user/dto/request/find-userId.dto";

export class UserRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}
  // 회원생성
  async createUser(createUserDto: CreateUserDto) {
    // 동일한 이메일이 있는지 확인
    const isEmail: any = await this.getUserByEmail(createUserDto.email);
    // 동일한 정보가 없는 경우 정보 등록
    if (isEmail.length === 0) {
      const newUser: any = new this.userModel({
        userId: createUserDto.userId,
        email: createUserDto.email,
        password: createUserDto.password,
        userName: createUserDto.userName,
      });

      try {
        const createdUser: any = await newUser.save();
        return createdUser;
      } catch (error) {
        throw new InternalServerErrorException(error);
      }
    } else {
      // 이메일이 존재하거나
      throw new ConflictException("이미 존재하는 이메일입니다.");
    }
  }
  // 동일한 유저 아이디 체크
  async getUserByUserId(userId: string) {
    const user: any = await this.userModel.find({ userId });
    return user;
  }
  // 동일한 이메일 체크
  async getUserByEmail(email: string) {
    try {
      const user: any = await this.userModel.find({ email }).exec();
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  // 유저 데이터 조회(패스워드 제외한)
  async getUserDataById(id: string) {
    try {
      const user: any = await this.userModel.findById(id).select("-password");
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // 유저 데이터 조회(패스워드 제외한)
  async getUserInfoById(id: string) {
    try {
      const user: any = await this.userModel
        .findById(id)
        .select("userId, email, userName");
      return user;
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }

  // 비밀 번호 수정
  async updateUserPassword(id: string, new_password: string) {
    try {
      return await this.userModel.findByIdAndUpdate(id, {
        $set: { password: new_password },
      });
    } catch (err) {
      throw new InternalServerErrorException(err);
    }
  }
  // 회원탈퇴
  async remove(id: string) {
    try {
      await this.userModel.remove({ _id: id });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }
  // 신규 그룹 생성시 유저에 그룹 objectId 추가
  async addGroupIdFromGroup(id: string, group: any) {
    try {
      // 해당 유저로 생성한 그룹아이디를 추가한다.
      const updateUser: any = await this.userModel.updateOne(
        { _id: id },
        {
          $push: { groups: { _id: group._id } },
        },
      );
      return updateUser;
    } catch (err) {
      throw new NotFoundException("Not Found Data and update");
    }
  }

  // 유저의 비밀번호 가져오기
  async getUserPasswordById(id: string) {
    const result: any = await this.userModel.findById(id).select("password");
    return result;
  }

  // 유저 아이디 찾기
  async findUserId(id: string, dto: FindUserIdDto) {
    const { email, userName } = dto;
    return await this.userModel
      .findOne({ _id: id, email: email, userName: userName })
      .select("userId");
  }
}
