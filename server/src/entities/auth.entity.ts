import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Document, Schema as MongooseSchema } from "mongoose";

@Schema({ versionKey: false })
export class Auth extends Document {
  @Prop({ required: true })
  authNumber: number;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
