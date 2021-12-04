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
import { GroupService } from "../group/group.service";
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

  create(createScheduleDto: CreateScheduleDto) {
    return "This action adds a new schedule";
  }

  update(id: number, updateScheduleDto: UpdateScheduleDto) {
    return `This action updates a #${id} schedule`;
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
