import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { InjectConnection } from "@nestjs/mongoose";
import * as bcrypt from "bcrypt";
import { Connection } from "mongoose";

import HttpError from "src/commons/httpError";
import { AuthRepository } from "src/repositories/auth.repository";
import { UserRepository } from "src/repositories/user.repository";
import { AuthService } from "../auth/auth.service";
import { CreateUserDto } from "./dto/request/create-user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectConnection()
    private readonly mongoConnection: Connection,
    private readonly userRepository: UserRepository,
    private readonly authRepository: AuthRepository,
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
    const session = await this.mongoConnection.startSession();

    await session.withTransaction(async () => {
      if (!auth || !new_password) {
        throw new HttpError(400, "Bad Request");
      }
      const { _id }: any = await this.authRepository.validateToken(auth);
      if (!_id) throw new HttpError(401, "Unauthorized");
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
      if (!auth) throw new HttpError(400, "Bad Request");
      const data: any = await this.authRepository.validateToken(auth);
      const { _id } = data;
      if (!_id) throw new HttpError(401, "Unauthorized");
      const result: any = await this.userRepository.signOut(_id);
      if (!result) throw new HttpError(404, "Not Found");
      else return result;
    });
    session.endSession();
  }
}
