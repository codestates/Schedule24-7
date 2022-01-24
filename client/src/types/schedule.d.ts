interface scheduleItemType {
  DayNum: string;
  NewDummy: singleSchedule;
}
interface singleSchedule {
  contents: contentArray[];
  createdAt: string;
  group: {
    groupId: string;
    groupName: string;
  };
  period: string;
  scheduleEmoji: string;
  scheduleName: string;
  _id: string;
}
interface contentArray {
  contentId: number;
  date: string;
  team: any[];
}

interface currentScheduleType {
  currentSchedule: singleSchedule[];
}

interface scheduleInfoTypes {
  scheduleInfo: {
    scheduleName: string;
    period: string;
  };
  handleTextInfo: any;
  handleEmoji: any;
  setScheduleInfo: any;
}

interface singleGroupType {
  conditionIdCount: number;
  conditions: any[];
  createdAt: string;
  groupDesc: string;
  groupEmoji: string;
  groupName: string;
  members: any[];
  schdeles: singleSchedule;
  works: any[];
  _id: string;
  // __v: number;
}
