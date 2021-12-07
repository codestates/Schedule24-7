import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { HttpArgumentsHost } from "@nestjs/common/interfaces";

@Catch()
export default class CatchException implements ExceptionFilter {
  // ExceptionFilter 인터페이스를 구현해야 하는 함수
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse();

    let httpError = null;
    console.log(exception);

    if (exception instanceof HttpException) {
      // status: xxx, message,: 'XXX' 형식의 에러인지 판단함.
      httpError = {
        status: exception.getStatus(),
        message: exception.message,
      };
    } else {
      httpError = {
        status: 500,
        message: "Internal Server Error",
      };
    }

    const { status, message } = httpError;
    return response.status(status).json({
      status,
      message,
    });
  }
}
