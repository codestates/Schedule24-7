import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class ModifyScheduleDto {
  @IsString({ message: "스케쥴 이름의 타입이 올바르지 않습니다." })
  @ApiProperty({ example: "21년 11월", description: "년월" })
  scheduleName: string;

  @IsString({ message: "스케쥴 이모지의 타입이 올바르지 않습니다." })
  @ApiProperty({
    example: "💡",
    description: "이모지",
  })
  scheduleEmoji: string;
}
