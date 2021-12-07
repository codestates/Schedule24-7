import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { MorganInterceptor, MorganModule } from "nest-morgan";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import CatchException from "./commons/catchException";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { AuthModule } from "./modules/auth/auth.module";
import { GroupModule } from "./modules/group/group.module";
import { ScheduleModule } from "./modules/schedule/schedule.module";

import { UserModule } from "./modules/user/user.module";

@Module({
  imports: [
    ConfigModule,
    MorganModule,
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.getMongoConfig(),
    }),
    UserModule,
    GroupModule,
    AuthModule,
    ScheduleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor("dev"),
    },
    {
      provide: APP_FILTER,
      useClass: CatchException,
    },
  ],
})
export class AppModule {}
