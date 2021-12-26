import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateScheduleDto {
  @IsString({ message: "스케쥴 이름의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "스케쥴 이름은 필수값입니다." })
  @ApiProperty({ example: "21년 11월", description: "년월", required: true })
  scheduleName: string;

  @IsString({ message: "스케쥴 이모지의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "스케쥴 이모지는 필수값입니다." })
  @ApiProperty({
    example: "💡",
    description: "이모지",
    required: true,
  })
  scheduleEmoji: string;

  @IsString({ message: "시작일의 타입이 올바르지 않습니다." })
  @IsNotEmpty({ message: "시작일은 필수값입니다." })
  @ApiProperty({
    example: "2021-11-01",
    description: "시작일",
    required: true,
  })
  period: string;
}
