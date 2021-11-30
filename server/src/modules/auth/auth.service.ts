import { Injectable } from "@nestjs/common";
import { AuthRepository } from "../../repositories/auth.repository";
import { AuthLoginDto } from "./dto/auth-login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}
  login(authLoginDto: AuthLoginDto) {
    console.log(authLoginDto);
    console.log(authLoginDto.userId);
    return this.authRepository.login(authLoginDto);
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
