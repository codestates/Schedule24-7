import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
import { MongooseModule } from "@nestjs/mongoose";
import { MorganInterceptor, MorganModule } from "nest-morgan";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "./config/config.module";
import { ConfigService } from "./config/config.service";
import { AuthModule } from "./modules/auth/auth.module";
import { GroupModule } from "./modules/group/group.module";
import { UserModule } from "./modules/user/user.module";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

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
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getSecretConfig(),
      }),
      inject: [ConfigService],
    }),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport:
          "smtps://AKIAWWOKYD7J36464T4W:BLvgm+QDx/qg53AlnvdglI24KffEAYtNyXwVh8ob3Ld1@email-smtp.ap-northeast-2.amazonaws.com/",
        template: {
          dir: __dirname + "/templates",
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: MorganInterceptor("dev"),
    },
  ],
})
export class AppModule {}
