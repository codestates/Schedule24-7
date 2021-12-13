import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class AuthCheckPasswordLossDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "유저 이름" })
  userName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "유저 아이디" })
  userId: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ description: "이메일" })
  email: string;
}
