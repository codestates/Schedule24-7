import {
  loginChange,
  logoutChange,
  LOG_IN,
  LOG_OUT,
  SocialLoginChange,
  SocialLogoutChange,
  SOCIAL_LOG_IN,
  SOCIAL_LOG_OUT,
} from "../actions/loginActions";
import { loginInitialState } from "./initialState";

type loginAction =
  | ReturnType<typeof loginChange>
  | ReturnType<typeof logoutChange>
  | ReturnType<typeof SocialLoginChange>
  | ReturnType<typeof SocialLogoutChange>;

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
    case SOCIAL_LOG_IN: {
      return Object.assign({}, state, {
        socialLogin: true,
      });
    }
    case SOCIAL_LOG_OUT: {
      return Object.assign({}, state, {
        socialLogin: false,
      });
    }

    default: {
      return state;
    }
  }
};

export default loginReducer;
