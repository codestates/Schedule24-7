import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/commons/response.dto";
export class ModifyScheduleResDto extends ResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: "스케쥴의 기본정보가 정상적으로 변경되었습니다.",
  })
  message: string;
}
