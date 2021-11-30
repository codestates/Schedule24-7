import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document, Types } from "mongoose";

@Schema({ versionKey: false })
export class User extends Document {
  @Prop({ required: true, index: true })
  userId: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  // 체험용 계정 여부 확인
  @Prop({ required: true, default: false })
  test: boolean;

  @Prop({ required: false })
  corpName: string;

  @Prop({ required: false })
  userName: string;

  @Prop({ required: false })
  birthDate: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ required: true, enum: ["ADMIN", "USER"], default: "ADMIN" })
  role: string;

  @Prop({ required: true, default: "jwt" })
  tokenType: string;

  @Prop()
  groups: [Types.ObjectId];
}

export const UserSchema = SchemaFactory.createForClass(User);
