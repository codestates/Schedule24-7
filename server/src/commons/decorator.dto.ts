import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Group } from "src/entities/group.entity";

export const GetGroup = createParamDecorator(
  (data, ctx: ExecutionContext): Group => {
    const req = ctx.switchToHttp().getRequest();
    //console.log(req.body);
    return req.body;
  },
);
