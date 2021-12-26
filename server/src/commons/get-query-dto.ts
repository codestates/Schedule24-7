import { IsOptional } from "class-validator";
import { Schema as MongooseSchema } from "mongoose";

// 컨트롤러 요청하는 쿼리 자동으로 데코레이터로 만들어주는.
export class GetQueryDto {
  @IsOptional()
  id: MongooseSchema.Types.ObjectId;
  @IsOptional()
  from?: number;
  @IsOptional()
  limit?: number;
}
