import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDto {
  @IsString({ message: "변경할 비밀번호의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "변경할 비밀번호는 필수값입니다." })
  @ApiProperty({
    example: "12345",
    description: "변경할 비밀번호",
    required: true,
  })
  new_password: string;
}
