import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/commons/response.dto";

export class GetUserInfoResDto extends ResponseDto {
  @ApiProperty({
    example: {
      _id: "61a5e1fabb37a79085a9b5e6",
      groups: [],
      role: "ADMIN",
      test: false,
      email: "heokiro13@gmail.com",
      userId: "heokiro2",
      createdAt: "2021-11-30T08:34:02.190Z",
    },
  })
  data: any;
  @ApiProperty({ example: "정보 조회가 성공했습니다." })
  message: string;
}
