import {
  addNewSchedule,
  ADD_SCHEDULE,
  SaveSchedule,
  SAVE_SCHEDULE,
  setFirstView,
  SET_FIRST,
} from "../actions/scheduleActions";
import { scheduleInitialState } from "./initialState";

type scheduleAction =
  | ReturnType<typeof setFirstView>
  | ReturnType<typeof addNewSchedule>
  | ReturnType<typeof SaveSchedule>;

const scheduleReducer = (
  state = scheduleInitialState,
  action: scheduleAction
) => {
  switch (action.type) {
    case SET_FIRST: {
      return Object.assign({}, state, {
        firstView: action.payload,
      });
    }

    case ADD_SCHEDULE: {
      return Object.assign({}, state, {
        data: [...state.data, action.payload],
      });
    }

    case SAVE_SCHEDULE: {
      return Object.assign({}, state, {
        data: [...action.payload],
      });
    }

    default: {
      return state;
    }
  }
};

export default scheduleReducer;
