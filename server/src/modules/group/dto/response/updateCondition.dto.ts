import { ApiProperty } from "@nestjs/swagger";

export class UpdateConditionResDto {
  @ApiProperty({
    example: "조건 추가가 완료되었습니다",
  })
  result: string;
}
