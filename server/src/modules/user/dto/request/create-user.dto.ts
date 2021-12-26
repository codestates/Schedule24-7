import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsString({ message: "아이디의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "아이디는 필수값입니다." })
  @ApiProperty({ example: "hekiro1234", description: "아이디", required: true })
  userId: string;

  @IsString({ message: "이메일의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "이메일은 필수값입니다." })
  @ApiProperty({
    example: "hekiro1234@gmail.com",
    description: "이메일",
    required: true,
  })
  email: string;

  @IsString({ message: "이름의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "이름은 필수값입니다." })
  @ApiProperty({
    example: "허재혁",
    description: "이름",
    required: true,
  })
  userName: string;

  @IsString({ message: "비밀번호의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "비밀번호는 필수값입니다." })
  @ApiProperty({ example: "1234", description: "비밀번호", required: true })
  password: string;
}
