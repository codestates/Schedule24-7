import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document, Types } from "mongoose";

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })
  userId: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ enum: ["NORMAL", "TEST"], default: "NORMAL" })
  test: string;

  @Prop({ required: true })
  password: string;

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

  @Prop()
  groups: [Types.ObjectId];
}

export const UserSchema = SchemaFactory.createForClass(User);
