import { HttpException } from "@nestjs/common";
/**
 * 에러 던지
 * throw new HttpError(404, "존재하지 않는 사용자")
 */
export default class HttpError extends HttpException {
  public statusCode = 0;
  public message = "";

  constructor(status: number, message: string) {
    super(message, status);
    this.statusCode = status;
    this.message = message;
  }
}
