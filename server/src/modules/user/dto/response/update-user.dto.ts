import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/commons/response.dto";

export class UpdateUserResDto extends ResponseDto {
  @ApiProperty()
  data: any;

  @ApiProperty({
    example: "회원정보수정이 완료되었습니다.",
  })
  message: string;
}
