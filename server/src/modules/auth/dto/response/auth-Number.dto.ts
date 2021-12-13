import { ApiProperty } from "@nestjs/swagger";

export class AuthNumberResDto {
  @ApiProperty({
    example: "4872",
  })
  authNumber: string;

  @ApiProperty({
    example: "sadf211dsaf1sdaf",
  })
  _id: string;
}
