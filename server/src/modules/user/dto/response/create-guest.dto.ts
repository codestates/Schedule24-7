import { ApiProperty } from "@nestjs/swagger";

export class CreateGuestResDto {
  @ApiProperty({
    example:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWI2OGI2ZTAwNGQwYTc1MGViM2M4MTUiLCJpYXQiOjE2MzkzNTMxOTgsImV4cCI6MTYzOTQzOTU5OH0.Kz7iPKHn7SU6WX3WQi1UBaNJl-YYR74ii2T0ZSHmwaU",
  })
  accessToken: any;

  @ApiProperty({
    example: true,
  })
  test: boolean;
}
