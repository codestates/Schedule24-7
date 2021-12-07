import {
  addNewSchedule,
  ADD_SCHEDULE,
  setFirstView,
  SET_FIRST,
} from "../actions/scheduleActions";
import { scheduleInitialState } from "./initialState";

type scheduleAction =
  | ReturnType<typeof setFirstView>
  | ReturnType<typeof addNewSchedule>;

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
      //   let tmp = [];
      //   tmp.push(action.payload);
      return Object.assign({}, state, {
        data: [...state.data, action.payload],
      });
    }

    default: {
      return state;
    }
  }
};

export default scheduleReducer;
