import { ApiProperty } from "@nestjs/swagger";

export class AuthCheckPasswordLossResDto {
  @ApiProperty({
    example: "email was sent",
  })
  message: string;
}
