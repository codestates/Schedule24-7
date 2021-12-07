export const SET_FIRST = "SET_FIRST" as const;
export const ADD_SCHEDULE = "ADD_SCHEDULE" as const;

export const setFirstView = (payload: string) => ({
  type: SET_FIRST,
  payload,
});

export const addNewSchedule = (payload: any) => ({
  type: ADD_SCHEDULE,
  payload,
});
