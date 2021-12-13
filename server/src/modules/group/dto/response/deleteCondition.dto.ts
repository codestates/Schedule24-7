import { ApiProperty } from "@nestjs/swagger";

export class DeleteConditionResDto {
  @ApiProperty({
    example: "조건 삭제가 완료되었습니다",
  })
  result: string;
}
