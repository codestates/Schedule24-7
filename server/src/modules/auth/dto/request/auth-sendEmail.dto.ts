import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthSendEmailDto {
  @IsString({ message: "이메일의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "이메일은 필수값입니다." })
  @ApiProperty({ description: "이메일" })
  email: string;
}
