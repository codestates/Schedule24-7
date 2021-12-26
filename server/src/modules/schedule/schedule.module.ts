import { forwardRef, Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import { ScheduleService } from "./schedule.service";
import { ScheduleController } from "./schedule.controller";
import { ScheduleRepository } from "src/repositories/schedule.repository";
import { GroupModule } from "../group/group.module";
import { UserModule } from "../user/user.module";
import { Schedule, ScheduleSchema } from "src/entities/schedule.entity";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Schedule.name, schema: ScheduleSchema },
    ]),
    UserModule,
    forwardRef(() => GroupModule),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService, ScheduleRepository],
  exports: [ScheduleService, ScheduleRepository],
})
export class ScheduleModule {}
