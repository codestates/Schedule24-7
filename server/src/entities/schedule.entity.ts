import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

class Content {
  @Prop({ required: true, index: true })
  contentId: number;
  @Prop({ required: true })
  date: string;
  @Prop()
  team: Team[];
}
class Team {
  @Prop()
  work: Work;

  @Prop()
  members: Member[];
}

class Member {
  @Prop({ required: true, index: true })
  memberId: number;
  @Prop({ required: true })
  memberName: string;
}
class Work {
  @Prop({ required: true, index: true })
  workId: number;
  @Prop({ required: true })
  workName: string;
}

class Group {
  @Prop()
  groupId: number;

  @Prop()
  groupName: string;
}

@Schema()
export class Schedule extends Document {
  @Prop({ required: true })
  scheduleName: string;
  @Prop({ required: true })
  scheduleEmoji: string;
  @Prop({ required: true })
  period: string; // 2021-12-01
  @Prop({ default: Date.now })
  createdAt: Date;
  @Prop({ required: true })
  group: Group;
  @Prop()
  contents: Content[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
