import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cookieParser from "cookie-parser";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { ValidationPipe } from "@nestjs/common";

import { ConfigService } from "./config/config.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new ConfigService();
  app.enableCors({
    origin: true,
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // 데코레이터가 없는 속성이면 해당 속성은 제거하고 받아들임
      forbidNonWhitelisted: true, // DTO에 정의되지 않는 값이 넘오면 요청자체를 막음
      transform: true, // 클라이언트에서 값을 받자마자 정의한 타입대로 자동형변환
    }),
  );

  const apiConfig = new DocumentBuilder()
    .setTitle("Schedule 24/7 APIs")
    .setDescription("이곳은 Schedule 24/7의 API문서입니다.")
    .setVersion("0.1a")
    .build();
  const document = SwaggerModule.createDocument(app, apiConfig);
  SwaggerModule.setup("api-doc", app, document);

  await app.listen(await config.getPortConfig());
}
bootstrap();
