import { ApiProperty } from "@nestjs/swagger";

export class AuthCheckUserIdLossResDto {
  @ApiProperty({
    example: "email was sent",
  })
  message: string;
}
