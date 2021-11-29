import { ApiProperty } from "@nestjs/swagger";

import { ResponseDto } from "../../../../commons/response.dto";

export class ResCreateUserDto extends ResponseDto {
  @ApiProperty({
    example: null,
  })
  data: any;

  @ApiProperty({
    example: 201,
  })
  statusCode: number;

  @ApiProperty({
    example: "회원가입이 완료되었습니다.",
  })
  message: string;
}
