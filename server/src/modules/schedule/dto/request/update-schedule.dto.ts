import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";

export class UpdateScheduleDto {
  @IsArray()
  @ApiProperty({
    example: [
      {
        work: {
          workId: 1,
          workName: "N",
        },
        members: [
          {
            memberId: 1,
            memberName: "김코딩",
          },
          {
            memberId: 2,
            memberName: "박해커",
          },
        ],
      },
    ],
  })
  readonly team: string;
}
