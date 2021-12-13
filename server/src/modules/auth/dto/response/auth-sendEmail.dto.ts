import { ApiProperty } from "@nestjs/swagger";

export class AuthSendEmailResDto {
  @ApiProperty({
    example: "email was sent",
  })
  message: string;

  @ApiProperty({
    example: "sadf211dsaf1sdaf",
  })
  _id: string;
}
