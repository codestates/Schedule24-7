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
import { Auth, AuthSchema } from "src/entities/auth.entity";
import { UserModule } from "../user/user.module";
import { HttpModule } from "@nestjs/axios";

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Auth.name, schema: AuthSchema },
    ]),
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.getSecretConfig(),
      }),
      inject: [ConfigService],
    }),
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    ConfigModule,
    UserModule,
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: "Google",
          host: process.env.EMAIL_HOST,
          port: 587,
          secure: false,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
        defaults: {
          from: `"Team DevUp" <${process.env.EMAIL_ADDRESS}>`,
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
