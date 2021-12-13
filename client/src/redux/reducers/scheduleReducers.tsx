import {
  addCurrentContentId,
  addCurrentData,
  addCurrentGroupId,
  addCurrentView,
  addCurrentWork,
  addNewSchedule,
  ADD_SCHEDULE,
  CURRENT_CONTENT,
  CURRENT_DATA,
  CURRENT_GROUP,
  CURRENT_VIEW,
  CURRENT_WORK,
  saveSchedule,
  SAVE_SCHEDULE,
  setFirstView,
  SET_FIRST,
} from "../actions/scheduleActions";
import { scheduleInitialState } from "./initialState";

type scheduleAction =
  | ReturnType<typeof setFirstView>
  | ReturnType<typeof addNewSchedule>
  | ReturnType<typeof addCurrentWork>
  | ReturnType<typeof saveSchedule>
  | ReturnType<typeof addCurrentGroupId>
  | ReturnType<typeof addCurrentContentId>
  | ReturnType<typeof addCurrentView>
  | ReturnType<typeof addCurrentData>;

const scheduleReducer = (
  state = scheduleInitialState,
  action: scheduleAction
) => {
  switch (action.type) {
    case SET_FIRST: {
      return Object.assign({}, state, {
        firstView: { date: action.payload.period, id: action.payload._id },
      });
    }

    case ADD_SCHEDULE: {
      return Object.assign({}, state, {
        data: [...state.data, action.payload],
      });
    }

    case CURRENT_WORK: {
      return Object.assign({}, state, {
        worker: action.payload,
      });
    }

    case SAVE_SCHEDULE: {
      return Object.assign({}, state, {
        data: [...action.payload],
      });
    }

    case CURRENT_GROUP: {
      return Object.assign({}, state, {
        groupId: action.payload,
      });
    }

    case CURRENT_CONTENT: {
      return Object.assign({}, state, {
        contentId: action.payload,
      });
    }

    case CURRENT_VIEW: {
      return Object.assign({}, state, {
        currentView: action.payload,
      });
    }

    case CURRENT_DATA: {
      return Object.assign({}, state, {
        currentData: action.payload,
      });
    }

    default: {
      return state;
    }
  }
};

export default scheduleReducer;

// {
//   contentId: action.payload.contentId,
//   date: action.payload.date,
//   team: action.payload.team,
// }
