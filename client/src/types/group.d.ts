namespace Group {
  interface GroupListItemResDTO {
    createdAt: string;
    groupDesc: string;
    groupEmoji: string;
    groupName: string;
    _id: string;
    conditions: any[];
    members: {
      memberId: string;
      memberName: string;
      memberPosition: string;
      memberVacation: any[];
    }[];
    schedule: any[];
    works: any[];
  }

  interface GroupMemberCreateReqDTO {
    memberName: string;
    memberPosition: string;
    memberVacation: string[];
    groupId: string;
  }

  interface GroupCreateReqDTO {
    groupName: string;
    groupDesc: string;
    groupEmoji: string;
    works: {
      workName: string;
      limit: number;
    }[];
  }
}
