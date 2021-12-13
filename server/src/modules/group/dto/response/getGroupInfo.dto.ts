import { ApiProperty } from "@nestjs/swagger";

export class getGroupInfoResDto {
  @ApiProperty({
    example: [
      {
        id: 'ObjectId("619f0e9722f97d6e8631291d")',
        groupName: "당직1팀",
        groupDesc: "당직1팀에 대한 그룹입니다",
        groupEmoji: "💡",
        createdAt: "2021-12-01 01:01:01",
        works: [
          {
            workId: 1,
            workName: "Day",
            limit: 3,
          },
        ],
        members: [
          {
            memberId: 1,
            memberName: "김코딩",
            memberPosition: "대리",
            memberVacation: ["2021-12-01", "2021-12-02"],
          },
        ],
        conditions: [
          {
            conditionId: 1,
            conditionName: "주간연속3회",
            condtionDesc: "1주일에 한명이 연속 3번으로 나이트 불가",
            target: "all",
            cycle: "weekly",
            workId: 1,
            operation: "<",
            value: 3,
          },
        ],
        schedule: [
          {
            id: 'ObjectId("619f0e9722f97d6e8631291d")',
            scheduleName: "21년 11월",
            createdAt: "2021-12-01 01:01:01",
            scheduleEmoji: "💡",
            period: "2021-11-01",
            group: {
              groupId: 1,
              groupName: "당직 1팀",
            },
            contents: [
              {
                contentId: 1,
                date: "2021-11-01",
                team: [
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
                    ],
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
  @ApiProperty({
    example: 200,
  })
  statusCode: number;

  @ApiProperty({
    example: "OK",
  })
  message: string;
}
