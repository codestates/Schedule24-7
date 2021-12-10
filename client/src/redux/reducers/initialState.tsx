type loginInitialState = {
  login: boolean;
};

export const loginInitialState = { login: false };

export const scheduleInitialState = {
  firstView: { date: "", id: "" },
  worker: [],
  groupId: "",
  currentView: [{ contentId: 0, date: "", team: [] }],
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
