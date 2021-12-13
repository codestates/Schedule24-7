import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthCheckIdDto {
  @IsString({ message: "아이디의 타입이 올바르지 않습니다" })
  @IsNotEmpty({ message: "유저 아이디는 필수값입니다." })
  @ApiProperty({ description: "유저 아이디" })
  userId: string;
}
