namespace Group {
  interface GroupListItemResDTO {
    createdAt: string;
    groupDesc: string;
    groupEmoji: string;
    groupName: string;
    id: string;
    conditions: any[];
    members: any[];
    schedule: any[];
    works: any[];
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
