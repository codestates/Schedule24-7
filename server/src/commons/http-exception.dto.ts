import { HttpException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

// 잘못된 요청
export class BadRequestErr extends HttpException {
  @ApiProperty({ example: 400, description: "상태코드", required: true })
  statusCode: number;

  @ApiProperty({
    example: "Bad Request",
    description: "Bad Request",
    required: true,
  })
  message: string;
}

// 권한 오류
export class UnauthorizeErr extends HttpException {
  @ApiProperty({
    example: 401,
    description: "상태코드",
    required: true,
  })
  statusCode: number;
  @ApiProperty({
    example: "Unauthorized",
    description: "Unauthorized",
    required: true,
  })
  message: string;
}

// 파일을 찾을 수 없어요
export class NotFoundErr extends HttpException {
  @ApiProperty({
    example: 404,
    description: "상태코드",
    required: true,
  })
  statusCode: number;
  @ApiProperty({
    example: "Not Found",
    description: "Not Found",
    required: true,
  })
  message: string;
}

// 중복된 데이터
export class ConflictErr extends HttpException {
  @ApiProperty({
    example: 409,
    description: "상태코드",
    required: true,
  })
  statusCode: number;
  @ApiProperty({
    example: "Conflict",
    description: "Confilict",
    required: true,
  })
  message: string;
}
// 서버 에러
export class InternalSeverErr extends HttpException {
  @ApiProperty({
    example: 500,
    description: "상태코드",
    required: true,
  })
  statusCode: number;
  @ApiProperty({
    example: "Internal server error",
    description: "server err",
    required: true,
  })
  message: string;
}
