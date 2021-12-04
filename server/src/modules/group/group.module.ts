import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { GroupService } from "./group.service";
import { GroupController } from "./group.controller";
import { Group, GroupSchema } from "src/entities/group.entity";
import { GroupRepository } from "src/repositories/group.repository";
import { UserModule } from "../user/user.module";
import { ScheduleModule } from "../schedule/schedule.module";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    UserModule,
    forwardRef(() => ScheduleModule),
  ],
  controllers: [GroupController],
  providers: [GroupService, GroupRepository],
  exports: [GroupService, GroupRepository],
})
export class GroupModule {}
