import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from "mongoose";

class Group {
  @Prop()
  groupId: MongooseSchema.Types.ObjectId;

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

class Content {
  @Prop({ required: true, index: true })
  contentId: number;
  @Prop({ required: true })
  date: string;
  @Prop()
  team: Team[];
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
class Team {
  @Prop()
  work: Work;

  @Prop()
  members: Member[];
}

export const ScheduleSchema = SchemaFactory.createForClass(Schedule);
