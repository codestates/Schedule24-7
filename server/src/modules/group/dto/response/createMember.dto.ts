import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/commons/response.dto";
export class CreateMemberResDto extends ResponseDto {
  @ApiProperty({
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: "Created",
  })
  message: string;
}
