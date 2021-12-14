import { GET_GORUPS, GroupAction } from "../actions/Group";

export interface GroupStore {
  groups: Group.GroupListItemResDTO[];
  members: Group.GroupListItemResDTO[];
}

const initialState: GroupStore = {
  groups: [],
  members: [],
};

const groupReducer: Reducer<GroupStore, GroupAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_GORUPS: {
      const groups = (action.payload as Group.GroupListItemResDTO[]).map(
        (group) => ({
          ...group,
          conditions: group.conditions.map((condition) => {
            return {
              ...condition,
              workName:
                group.works.find((work) => work.workId === condition.workId)
                  ?.workName ?? "",
            };
          }),
        })
      );
      return {
        ...state,
        groups,
      };
    }
    default: {
      return state;
    }
  }
};

export default groupReducer;
