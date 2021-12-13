import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/commons/response.dto";
export class UpdateScheduleResDto extends ResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: "스케쥴 배정 인원 수정이 완료됐습니다.",
  })
  message: string;
}
