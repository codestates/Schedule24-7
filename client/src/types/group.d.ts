namespace Group {
  interface GroupListItemResDTO {
    map: any;
    createdAt: string;
    groupDesc: string;
    groupEmoji: string;
    groupName: string;
    _id: string;
    conditions: {
      conditionName: string;
      conditionDesc: string;
      target: string;
      cycle: string;
      workId: number;
      value: number;
      operation: string;
      conditionId: number;      
      workName: string;
    }[];
    members: {
      memberId: number;
      memberName: string;
      memberPosition: string;
      memberVacation: any[];
    }[];
    schedules: any[];
    works: {
      workName: string;
      limit: number;
      workId: number;
    }[];
      memberId: number;
      memberName: string;
      memberPosition: string;
      memberVacation: any[];
      conditionName: string;
      conditionDesc: string;
      target: string;
      cycle: string;
      workId: number;
      value: number;
      operation: string;
      conditionId: number;      
      workName: string;
  }

  interface GroupMemberCreateReqDTO {
    memberName: string;
    memberPosition: string;
    memberVacation: string[];
    groupId: string;
  }

  interface GroupMemberUpdateReqDTO {
    memberName: string;
    memberPosition: string;
    memberVacation: string[];
    groupId: string;
    memberId: number;
  }

  interface GroupConditionCreateReqDTO {
    groupId: string | undefined;
    conditionName: string;
    conditionDesc: string;
    target: string;
    cycle: string;
    workId: number;
    operation: string;
    value: number;
  }

  interface GroupConditionUpdateReqDTO {
    groupId: string | undefined;
    conditionName: string;
    conditionDesc: string;
    target: string;
    cycle: string;
    workId: number;
    operation: string;
    value: number;
    conditionId: number;
  }

  interface GroupDeleteReqDTO {
    groupId: string;
  }

  interface GroupMemberDeleteReqDTO {
    groupId: string;
    memberId: number;
  }

  interface GroupConditionDeleteReqDTO {
    groupId: string;
    conditionId: number;
  }

  interface GroupCreateReqDTO {
    groupName: string;
    groupDesc: string;
    groupEmoji: string;
    works: {
      workId: number;
      workName: string;
      limit: number;
    }[];
  }

  interface GroupUpdateReqDTO {
    groupId: string | undefined;
    groupName: string;
    groupDesc: string;
    groupEmoji: string;
    works: {
      workId: number;
      workName: string;
      limit: number;
    }[];
  }
}
