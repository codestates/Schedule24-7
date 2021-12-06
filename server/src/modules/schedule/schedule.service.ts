import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { AuthRepository } from "src/repositories/auth.repository";
import { GroupRepository } from "src/repositories/group.repository";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { UserRepository } from "src/repositories/user.repository";
import { CreateScheduleDto } from "./dto/create-schedule.dto";
import { UpdateScheduleDto } from "./dto/update-schedule.dto";

@Injectable()
export class ScheduleService {
  constructor(
    @Inject(forwardRef(() => GroupRepository))
    private readonly groupRepository: GroupRepository,
    private readonly authRepository: AuthRepository,
    private readonly scheduleRepository: ScheduleRepository,
    private readonly userRepoSitory: UserRepository,
  ) {}

  // create(createScheduleDto: CreateScheduleDto) {
  //   return "This action adds a new schedule";
  // }

  async updateSchedule(
    auth: string,
    groupId: string,
    scheduleId: string,
    schedule: any,
  ) {
    // 요청 정보 확인
    if (
      !auth.length ||
      !groupId.length ||
      !scheduleId.length ||
      !Object.keys(schedule).length
    ) {
      throw new BadRequestException("Bad Requst");
    }
    // 토큰 복호화해서 정보 확인
    const { _id }: any = await this.authRepository.validateToken(auth);
    const userInfo: any = await this.userRepoSitory.getUserDataById(_id);
    if (!userInfo) throw new UnauthorizedException("Unauthorized");
    // 그룹 도큐먼트에 그룹아이디와 스케쥴 아이디가 있는지 확인
    const groupInfo: any = await this.groupRepository.getScheduleIdFromGroup;
    // 있으면 해당 스케쥴의 내용을 수정
    return `This action updates a schedule`;
  }

  async removeSchedule(auth: string, groupId: string, scheduleId: string) {
    // 요청 정보 확인
    if (!auth.length || !groupId.length || !scheduleId.length) {
      throw new BadRequestException("Bad Requst");
    } else {
      // 토큰 정보 복호화
      const { _id }: any = await this.authRepository.validateToken(auth);
      const userInfo: any = await this.userRepoSitory.getUserDataById(_id);
      // 토큰 정보 확인
      if (!userInfo) throw new UnauthorizedException("Unauthorizied!");
      // 그룹에 스케쥴 아이디 삭제
      await this.groupRepository.removeScheduleIdFromGroup(groupId, scheduleId);
      // 스케쥴 삭제
      await this.scheduleRepository.removeSchedule(scheduleId);
    }
  }
}
