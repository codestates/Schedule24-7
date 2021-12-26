import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsString, IsNotEmpty } from "class-validator";

export class CreateMemberReqDto {
  @ApiProperty({
    example: "김코딩",
    description: "멤버명",
    required: true,
  })
  @IsString({ message: "memberName의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "memberName은 필수값입니다." })
  readonly memberName: string;

  @ApiProperty({
    example: "대리",
    description: "직위",
    required: true,
  })
  @IsString({ message: "memberPosition의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "memberPosition는 필수값입니다." })
  readonly memberPosition: string;

  @ApiProperty({
    example: ["2021-12-01", "2021-12-02"],
    description: "휴가",
  })
  @IsArray({ message: "groupEmoji의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "groupEmoji는 필수값입니다." })
  readonly memberVacation: string[];
}
