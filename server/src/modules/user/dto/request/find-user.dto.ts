import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class IsUserDto {
  @IsString({ message: "유저 아이디의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "유저 아이디는 필수값입니다." })
  @ApiProperty({ example: "hekiro1234", description: "아이디", required: true })
  userId: string;
}
