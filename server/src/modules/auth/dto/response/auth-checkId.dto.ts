import { ApiProperty } from "@nestjs/swagger";

export class AuthCheckIdResDto {
  @ApiProperty({
    example: "true",
  })
  result: true;
}
