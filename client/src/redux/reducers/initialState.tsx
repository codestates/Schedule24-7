type loginInitialState = {
  login: boolean;
};

export const loginInitialState = { login: false };

export const groupInitialState = [
  {
    groupId: "1dsxc",
    groupName: "당직1팀",
    groupDesc: "당직1팀에 대한 명단입니다",
    groupEmoji: "💡",
    works: [
      {
        workId: 1,
        workName: "D",
        limit: 3,
      },
    ],
    members: [
      {
        memberId: 1,
        memberName: "김코딩",
        memberPosition: "대리",
        memberVacation: ["2021-11-13 00:53:39", "2021-11-14 00:53:39"],
      },
      {
        memberId: 2,
        memberName: "박해커",
        memberPosition: "사원",
        memberVacation: ["2021-11-13 00:53:39", "2021-11-14 00:53:39"],
      },
      {
        memberId: 3,
        memberName: "이자바",
        memberPosition: "사원",
        memberVacation: ["2021-11-13 00:53:39", "2021-11-14 00:53:39"],
      },
    ],
    conditions: [
      {
        conditionId: 1,
        conditionName: "주간 연속3회",
        conditionDesc: "1주에 한명이 연속 3번으로 나이트 불가",
        target: "all",
        cycle: "weekly",
        targetWork: 561,
        operation: "<",
        value: 3,
      },
    ],
    schedule: [{ workId: 1 }, { workID: 2 }],
  },
  {
    groupId: "2dsxc",
    groupName: "당직2팀",
    groupDesc: "당직2팀에 대한 명단입니다",
    groupEmoji: "💡",
    works: [
      {
        workId: 1,
        workName: "D",
        limit: 3,
      },
    ],
    members: [
      {
        memberId: 1,
        memberName: "김코딩",
        memberPosition: "대리",
        memberVacation: ["2021-11-13 00:53:39", "2021-11-14 00:53:39"],
      },
      {
        memberId: 2,
        memberName: "박해커",
        memberPosition: "사원",
        memberVacation: ["2021-11-13 00:53:39", "2021-11-14 00:53:39"],
      },
      {
        memberId: 3,
        memberName: "이자바",
        memberPosition: "사원",
        memberVacation: ["2021-11-13 00:53:39", "2021-11-14 00:53:39"],
      },
    ],
    conditions: [
      {
        conditionId: 1,
        conditionName: "주간 연속3회",
        conditionDesc: "1주에 한명이 연속 3번으로 나이트 불가",
        target: "all",
        cycle: "weekly",
        targetWork: 561,
        operation: "<",
        value: 3,
      },
    ],
    schedule: [{ workId: 1 }, { workID: 2 }],
  },
];
