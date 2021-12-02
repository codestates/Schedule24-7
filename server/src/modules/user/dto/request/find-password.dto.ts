import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class FindPasswordDto {
  @IsString({ message: "유저 이름의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "유저 이름은 필수값입니다." })
  @ApiProperty({ example: "허재혁", description: "이름", required: true })
  userName: string;

  @IsString({ message: "이메일의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "이메일은 필수값입니다." })
  @ApiProperty({
    example: "test@example.com",
    description: "이메일",
    required: true,
  })
  email: string;

  @IsString({ message: "유저아이디의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "유저아이디는 필수값입니다." })
  @ApiProperty({
    example: "test01",
    description: "유저아이디",
    required: true,
  })
  userId: string;
}
