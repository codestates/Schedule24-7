import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date, Document, Schema as MongooseSchema } from "mongoose";
import { ScheduleSchema, Schedule } from "./schedule.entity";

@Schema()
export class Group extends Document {
  @Prop({ required: true })
  groupName: string;
  @Prop({ required: true, default: null })
  groupDesc: string;
  @Prop({ required: true, default: null })
  groupEmoji: string;
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ type: MongooseSchema.Types.Array })
  works: Work[];
  @Prop({ type: MongooseSchema.Types.Array })
  members: Member[];
  @Prop({ type: MongooseSchema.Types.Array })
  conditions: Condition[];

  // 스케줄 연결
  @Prop({ type: [ScheduleSchema] })
  groups: Schedule[];
}
class Work {
  @Prop({ index: true })
  workId: number;
  @Prop()
  workName: string;
  @Prop()
  limit: number;
}

class Member {
  @Prop({ index: true })
  memberId: number;
  @Prop()
  memberName: string;
  @Prop()
  memberPosition: string;
  @Prop()
  memberVacation: [string];
}

class Condition {
  @Prop({ required: true, index: true })
  conditionId: number;
  @Prop({ required: true })
  conditionName: string;
  @Prop()
  conditionDesc: string;
  @Prop()
  target: string;
  @Prop()
  cycle: string;
  @Prop()
  tagetWork: number;
  @Prop()
  operaion: string;
  @Prop()
  value: number;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
