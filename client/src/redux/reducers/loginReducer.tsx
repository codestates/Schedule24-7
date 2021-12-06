import {
  loginChange,
  logoutChange,
  LOG_IN,
  LOG_OUT,
} from "../actions/loginActions";
import { loginInitialState } from "./initialState";

type loginAction =
  | ReturnType<typeof loginChange>
  | ReturnType<typeof logoutChange>;

const loginReducer = (state = loginInitialState, action: loginAction) => {
  switch (action.type) {
    case LOG_IN: {
      return Object.assign({}, state, {
        login: true,
      });
    }
    case LOG_OUT: {
      return Object.assign({}, state, {
        login: false,
      });
    }
    default: {
      return state;
    }
  }
};

export default loginReducer;
