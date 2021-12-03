import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class AuthNumberDto {
  @IsNumber()
  @IsNotEmpty({ message: "authNumber는 필수 값입니다" })
  @ApiProperty({ description: "인증번호" })
  authNumber: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "오브젝트 아이디" })
  _id: string;
}
