import { ApiProperty } from "@nestjs/swagger";
export class UpdateMemberResDto {
  @ApiProperty({
    example: "업데이트가 정상적으로 완료되었습니다.",
  })
  result: string;
}
