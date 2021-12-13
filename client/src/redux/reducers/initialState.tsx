type loginInitialState = {
  login: boolean;
};

export const loginInitialState = { login: false };

export const scheduleInitialState = {
  firstView: { date: "", id: "" },
  worker: [],
  groupId: "",
  currentView: [{ contentId: 0, date: "", team: [] }],
  currentData: [
    {
      id: null,
      scheduleName: "",
      scheduleEmoji: "",
      createdAt: "",
      scheduleData: "",
      period: "",
      group: {
        groupId: 0,
        groupName: "",
      },
      contents: [
        {
          contentId: 0,
          date: "",
          team: [
            {
              work: {
                workId: 0,
                workName: "",
              },
              members: [
                {
                  memberId: 0,
                  memberName: "",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
  contentId: 0,
  data: [
    {
      id: null,
      scheduleName: "",
      createdAt: "",
      scheduleEmoji: "",
      period: "",
      group: {
        groupId: 0,
        groupName: "",
      },
      contents: [
        {
          contentId: 0,
          date: "",
          team: [
            {
              work: {
                workId: 0,
                workName: "",
              },
              members: [
                {
                  memberId: 0,
                  memberName: "",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
