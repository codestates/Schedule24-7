import { ApiProperty } from "@nestjs/swagger";

export class AuthGoogleLoginResDto {
  @ApiProperty({
    example: "123sfvcsart1234sd",
  })
  accessToken: string;
}
