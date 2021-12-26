import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Group } from "src/entities/group.entity";
import { Schedule } from "src/entities/schedule.entity";

export const GetGroup = createParamDecorator(
  (data, ctx: ExecutionContext): Group => {
    const req = ctx.switchToHttp().getRequest();
    //console.log(req.body);
    return req.body;
  },
);

export const GetSchedule = createParamDecorator(
  (data, ctx: ExecutionContext): Schedule => {
    const req = ctx.switchToHttp().getRequest();
    //console.log(req.body);
    return req.body;
  },
);
