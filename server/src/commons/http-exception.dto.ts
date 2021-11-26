import { HttpException } from "@nestjs/common";
import { ApiProperty } from "@nestjs/swagger";

// 잘못된 요청
export class BadRequestErr extends HttpException {
  @ApiProperty({ example: 400, description: "상태코드", required: true })
  statusCode: number;

  @ApiProperty({
    example: "잘못된 요청입니다.",
    description: "잘못된 요청입니다.",
    required: true,
  })
  message: string;

  @ApiProperty({ example: "Bad Request" })
  error: string;
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
    example: "권한이 만료되었습니다",
    description: "권한 만료",
    required: true,
  })
  message: string;
  @ApiProperty({
    example: "Unauthorized",
  })
  error: string;
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
    example: "일치하는 데이터가 없습니다.",
    description: "데이터를 찾을 수 없습니다.",
    required: true,
  })
  message: string;
  @ApiProperty({
    example: "File Not Found",
  })
  error: string;
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
    example: "이미 존재하는 데이터입니다",
    description: "동일한 데이터가 존재합니다.",
    required: true,
  })
  message: string;
  @ApiProperty({
    example: "Conflict File",
  })
  error: string;
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
    example: "서버에러가 발생하였습니다.",
    description: "서버 에러",
    required: true,
  })
  message: string;
  @ApiProperty({
    example: "Internal Server Error",
  })
  error: string;
}
