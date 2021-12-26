import { ApiProperty } from "@nestjs/swagger";

export class DeleteGuestResDto {
  @ApiProperty({
    example: "유저 정보가 정상적으로 삭제되었습니다.",
  })
  result: string;
}
