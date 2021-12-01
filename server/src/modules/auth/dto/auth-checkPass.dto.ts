import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthCheckPassDto {
  @IsString({ message: "비밀번호의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "비밀번호는 필수값입니다." })
  @ApiProperty({ description: "비밀번호" })
  password: string;
}
