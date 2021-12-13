import { ApiProperty } from "@nestjs/swagger";

export class AuthCheckPassResDto {
  @ApiProperty({
    example: "false",
  })
  result: true;
}
