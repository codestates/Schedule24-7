import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/commons/response.dto";
export class DeleteGroupResDto extends ResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: "Deleted",
  })
  message: string;
}
