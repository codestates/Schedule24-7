import { ApiProperty } from "@nestjs/swagger";

export class AuthLoginResDto {
  @ApiProperty({
    example: "123sfvcsart1234sd",
  })
  accessToken: string;
}
