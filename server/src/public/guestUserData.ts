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

export const guestGroups = [
  {
    groupName: "당직1팀",
    groupDesc: "총 7명, 주간/야간 근무 2명씩",
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
  },
  {
    groupName: "개발팀",
    groupDesc: "개발팀 인원들에 대한 테스트 용 그룹!",
    groupEmoji: "😃",
    works: [
      {
        workId: 1,
        workName: "재택근무",
        limit: 4,
      },
    ],
  },
];

export const membersList1 = [
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

export const membersList2 = [
  {
    memberName: "김코딩",
    memberPosition: "1년차",
    memberVacation: [],
  },
  {
    memberName: "박해커",
    memberPosition: "2년차",
    memberVacation: [],
  },
  {
    memberName: "최구글",
    memberPosition: "2년차",
    memberVacation: [],
  },
  {
    memberName: "이애플",
    memberPosition: "3년차",
    memberVacation: [],
  },
  {
    memberName: "고삼성",
    memberPosition: "4년차",
    memberVacation: [],
  },
  {
    memberName: "이메타",
    memberPosition: "4년차",
    memberVacation: [],
  },
  {
    memberName: "김버그",
    memberPosition: "1년차",
    memberVacation: [],
  },
];

export const membersLists = [membersList1, membersList2];

export const conditionsCollection = [
  [
    {
      conditionName: "주간 연속 3회 야간 불가",
      conditionDesc: "한주에 3번 나이트 불가",
      target: "all",
      cycle: "weekly",
      workId: 2,
      operation: "<",
      value: 6,
    },
  ],
  [
    {
      conditionName: "한주에 재택근무 6회 미만",
      conditionDesc: "한주에 재택 6번은 안됩니다",
      target: "all",
      cycle: "weekly",
      workId: 1,
      operation: "<",
      value: 6,
    },
  ],
];
