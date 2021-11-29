import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/commons/response.dto";

export class ResDeleteUserDto extends ResponseDto {
  @ApiProperty({
    example: null,
  })
  data: any;

  @ApiProperty({
    example: "회원 탈퇴가 성공하였습니다.",
  })
  message: string;
}
