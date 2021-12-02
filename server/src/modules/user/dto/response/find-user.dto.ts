import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/commons/response.dto";

export class IsUserResDto extends ResponseDto {
  @ApiProperty({ example: "OK" })
  message: string;
}
