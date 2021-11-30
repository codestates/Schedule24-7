import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Length } from "class-validator";

export class AuthLoginDto {
  @IsString({ message: "아이디의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "아이디는 필수값입니다." })
  @Length(1, 50)
  @ApiProperty({ description: "아이디" })
  userId: string;

  @IsString({ message: "비밀번호의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "비밀번호는 필수값입니다." })
  @ApiProperty({ description: "비밀번호" })
  password: string;
}
