import { Global, Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { AuthRepository } from "../../repositories/auth.repository";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/entities/user.entity";
import { JwtModule } from "@nestjs/jwt";
import { ConfigService } from "src/config/config.service";
import { ConfigModule } from "src/config/config.module";
import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getSecretConfig(),
      }),
      inject: [ConfigService],
    }),
    ConfigModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          host: "email-smtp.ap-northeast-2.amazonaws.com",
          port: 587,
          secure: true,
          auth: {
            user: "AKIAWWOKYD7J36464T4W",
            pass: "BLvgm+QDx/qg53AlnvdglI24KffEAYtNyXwVh8ob3Ld1",
          },
        },

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
  controllers: [AuthController],
  providers: [AuthService, AuthRepository],
  exports: [AuthService, AuthRepository],
})
export class AuthModule {}
