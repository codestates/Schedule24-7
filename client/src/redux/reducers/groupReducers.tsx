import { GET_GORUPS, GroupAction } from "../actions/Group";

export interface GroupStore {
  groups: Group.GroupListItemResDTO[];
}

const initialState: GroupStore = {
  groups: [],
};

const groupReducer: Reducer<GroupStore, GroupAction> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case GET_GORUPS: {
      return {
        ...state,
        groups: action.payload as Group.GroupListItemResDTO[],
      };
    }
    default: {
      return state;
    }
  }
};

export default groupReducer;
