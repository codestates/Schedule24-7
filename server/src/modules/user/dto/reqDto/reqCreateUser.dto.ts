import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class ReqCreateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "유저아이디", example: "siwoo1620" })
  userId: string;

  @IsString({ message: "이름의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "이름은 필수값입니다." })
  @ApiProperty({ description: "이름", example: "박시우" })
  name: string;

  @IsString({ message: "메일의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "이메일은 필수값입니다." })
  @ApiProperty({ description: "이메일", example: "example@sample.co.kr" })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "비밀번호", example: "abcd1234" })
  password: string;
}
