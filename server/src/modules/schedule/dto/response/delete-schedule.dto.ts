import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/commons/response.dto";
export class DeleteScheduleResDto extends ResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: "스케쥴이 정상적으로 삭제되었습니다.",
  })
  message: string;
}
