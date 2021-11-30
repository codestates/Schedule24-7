import { Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthRepository } from "../../repositories/auth.repository";
import { JwtService } from "@nestjs/jwt";
import { AuthLoginDto } from "./dto/auth-login.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(authLoginDto: AuthLoginDto) {
    const userInfo = await this.authRepository.getUserByUserId(
      authLoginDto.userId,
    );
    // 사용자 정보 확인하여 전달된 userId 검증
    if (!userInfo) {
      throw new UnauthorizedException("존재하지 않는 userId 입니다.");
    }
    // 패스워드 일치여부 확인
    const passwordCheck = await bcrypt.compare(
      authLoginDto.password,
      userInfo.password,
    );
    // 패스워드 불일치 경우
    if (!passwordCheck) {
      throw new UnauthorizedException("password가 일치하지 않습니다");
    }

    // 토큰 발급을 위한 정보 구성
    const payload: { [_id: string]: string } = { _id: userInfo._id.toString() };
    // 토큰 생성
    const accessToken: string = this.jwtService.sign(payload, {
      expiresIn: "1d",
    });

    return { accessToken };
  }

  checkToken(accessToken: string) {
    const result = this.jwtService.decode(accessToken);
    return result;
  }
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }
  // findAll() {
  //   return `This action returns all auth`;
  // }
  // findOne(id: number) {
  //   return `This action returns a #${id} auth`;
  // }
  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }
  // remove(id: number) {
  //   return `This action removes a #${id} auth`;
  // }
}
