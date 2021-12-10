export const SET_FIRST = "SET_FIRST" as const;
export const ADD_SCHEDULE = "ADD_SCHEDULE" as const;
export const SAVE_SCHEDULE = "SAVE_SCHEDULE" as const;
export const CURRENT_WORK = "CURRENT_WORK" as const;
export const CURRENT_GROUP = "CURRENT_GROUP" as const;
export const CURRENT_CONTENT = "CURRENT_CONTENT" as const;
export const CURRENT_VIEW = "CURRENT_VIEW" as const;

export const setFirstView = (payload: any) => ({
  type: SET_FIRST,
  payload,
});

export const addNewSchedule = (payload: any) => ({
  type: ADD_SCHEDULE,
  payload,
});

export const saveSchedule = (payload: any) => ({
  type: SAVE_SCHEDULE,
  payload,
});

export const addCurrentWork = (payload: any) => ({
  type: CURRENT_WORK,
  payload,
});

export const addCurrentGroupId = (payload: any) => ({
  type: CURRENT_GROUP,
  payload,
});

export const addCurrentContentId = (payload: any) => ({
  type: CURRENT_CONTENT,
  payload,
});

export const addCurrentView = (payload: any) => ({
  type: CURRENT_VIEW,
  payload,
});
