import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { User, UserSchema } from "../../entities/user.entity";
import { UserRepository } from "src/repositories/user.repository";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { GroupRepository } from "src/repositories/group.repository";
import { Group, GroupSchema } from "src/entities/group.entity";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { Schedule, ScheduleSchema } from "src/entities/schedule.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Group.name, schema: GroupSchema },
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserRepository, GroupRepository, ScheduleRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
