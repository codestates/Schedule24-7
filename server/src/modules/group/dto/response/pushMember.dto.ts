import { ApiProperty } from "@nestjs/swagger";

export class PushMemberResDto {
  @ApiProperty({
    example: "업데이트가 정상적으로 추가되었습니다",
  })
  result: string;
}
