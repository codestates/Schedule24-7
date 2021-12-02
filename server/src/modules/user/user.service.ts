import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { Schema as MongooseSchema } from "mongoose";

import { UserRepository } from "src/repositories/user.repository";
import { CreateUserDto } from "./dto/request/create-user.dto";
import { FindUserIdDto } from "./dto/request/find-userId.dto";
//import { UpdateUserDto } from "./dto/request/update-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  // 아이디 중복체크
  async checkUserId(userId: string) {
    const result: any = await this.userRepository.getUserByUserId(userId);
    return result.length ? true : false;
  }

  // 비밀번호 일치확인
  async checkPassword(id: string, password: string) {
    const userInfo: any = await this.userRepository.getUserPasswordById(id);
    const isEqual: boolean = await bcrypt.compare(password, userInfo.password);
    return isEqual;
  }

  // 회원가입
  async createUser(createUserDto: CreateUserDto) {
    // encode password
    const salt: string = await bcrypt.genSalt(10);
    const password: string = await bcrypt.hash(createUserDto.password, salt);
    createUserDto.password = password;

    const createdUser = await this.userRepository.createUser(createUserDto);
    return createdUser;
  }
  // 유저 정보 조회(패스워드를 제외한 전부)
  async getUserInfoAll(id: string) {
    try {
      const user: any = await this.userRepository.getUserDataById(id);

      if (!user) {
        throw new NotFoundException(`Not Found`);
      }
      return user;
    } catch (err) {
      throw new InternalServerErrorException("Internal Server Error");
    }
  }

  // 유저 정보 조회(아이디, 이름, 이메일)
  async getUserInfo(id: string) {
    try {
      const user: any = await this.userRepository.getUserInfoById(id);

      if (!user) {
        throw new NotFoundException(`Not Found`);
      }
      return user;
    } catch (err) {
      throw new InternalServerErrorException("Internal Server Error");
    }
  }
  // 비밀번호 변경
  async updatePassword(id: string, new_password: string) {
    // encode password
    const salt: string = await bcrypt.genSalt(10);
    const password: string = await bcrypt.hash(new_password, salt);
    return this.userRepository.updateUserPassword(id, password);
  }
  // 회원탈퇴
  async remove(id: string) {
    return await this.userRepository.remove(id);
  }
  // 유저의 그룹 아이디 추가
  async addGroupIdFromGroup(id: string, group: any) {
    const result: any = await this.userRepository.addGroupIdFromGroup(
      id,
      group,
    );
    return result;
  }
  // 아이디 찾기
  async findId(id: string, findUserIdDto: FindUserIdDto) {
    const { userId } = await this.userRepository.findUserId(id, findUserIdDto);
    return userId;
  }
}
