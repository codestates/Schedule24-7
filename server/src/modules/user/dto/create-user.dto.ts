import { IsNotEmpty, IsString, Length } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @IsString({ message: "이름의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "이름은 필수값입니다." })
  @Length(1, 50)
  @ApiProperty({ description: "이름" })
  name: string;

  @IsString({ message: "메일의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "이메일은 필수값입니다." })
  @ApiProperty({ description: "이메일" })
  email: string;

  @IsString()
  @IsNotEmpty()
  role: any;
}
