import { nanoid } from "nanoid";

export function generateGuestUserInfo(): {
  userId: string;
  userName: string;
  password: string;
  test: boolean;
  email: string;
} {
  return {
    userId: nanoid(),
    userName: "guest",
    password: nanoid(),
    test: true,
    email: nanoid(30),
  };
}

export const guestGroupInfo = {
  groupName: "당직1팀",
  groupDesc: "당직1팀에 대한 그룹명단",
  groupEmoji: "😃",
  works: [
    {
      workId: 1,
      workName: "주간",
      limit: 2,
    },
    {
      workId: 2,
      workName: "야간",
      limit: 2,
    },
  ],
};

export const membersInfoList = [
  {
    memberName: "김대리",
    memberPosition: "대리",
    memberVacation: [],
  },
  {
    memberName: "최과장",
    memberPosition: "과장",
    memberVacation: [],
  },
  {
    memberName: "이사원",
    memberPosition: "사원",
    memberVacation: [],
  },
  {
    memberName: "박사원",
    memberPosition: "사원",
    memberVacation: [],
  },
  {
    memberName: "최팀장",
    memberPosition: "팀장",
    memberVacation: [],
  },
  {
    memberName: "심대리",
    memberPosition: "대리",
    memberVacation: [],
  },
  {
    memberName: "허사원",
    memberPosition: "사원",
    memberVacation: [],
  },
];

export const conditionInfoList = [
  {
    conditionName: "주간 연속 3회 야간 불가",
    conditionDesc: "한주에 6번 나이트 불가",
    target: "all",
    cycle: "weekly",
    workId: 2,
    operation: "<",
    value: 6,
  },
];
