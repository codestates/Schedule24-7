import { ApiProperty } from "@nestjs/swagger";
import { ResponseDto } from "src/commons/response.dto";
export class GetScheduleResDto extends ResponseDto {
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: "OK",
  })
  message: string;

  @ApiProperty({
    example: [
      {
        _id: "61b5f460d3bf604936d7995d",
        contents: [
          {
            contentId: 1,
            date: "2021. 11. 1. 오전 12:00:00",
            team: [
              {
                work: {
                  workId: 1,
                  workName: "D",
                  limit: 3,
                },
                members: [
                  {
                    memberId: 14,
                    memberName: "아이유",
                  },
                  {
                    memberId: 9,
                    memberName: "태민",
                  },
                  {
                    memberId: 6,
                    memberName: "나코",
                  },
                ],
              },
              {
                work: {
                  workId: 2,
                  workName: "E",
                  limit: 3,
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
                  {
                    memberId: 3,
                    memberName: "이민형",
                  },
                ],
              },
              {
                work: {
                  workId: 3,
                  workName: "N",
                  limit: 3,
                },
                members: [
                  {
                    memberId: 19,
                    memberName: "청하",
                  },
                  {
                    memberId: 0,
                    memberName: "김코딩",
                  },
                  {
                    memberId: 7,
                    memberName: "안유진",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  })
  result: any;
}
