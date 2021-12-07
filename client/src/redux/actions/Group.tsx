export const GET_GORUPS = "group/GET_GROUPS" as const;

export const getGroups: ActionCreater<
  typeof GET_GORUPS,
  Group.GroupListItemResDTO[]
> = (payload) => ({
  type: GET_GORUPS,
  payload,
});

export type GroupAction = ReturnType<typeof getGroups>;
