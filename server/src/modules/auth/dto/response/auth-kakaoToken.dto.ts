import { ApiProperty } from "@nestjs/swagger";

export class AuthKakaoLoginResDto {
  @ApiProperty({
    example: "123sfvcsart1234sd",
  })
  accessToken: string;
}
