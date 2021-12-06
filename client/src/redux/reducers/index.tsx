import { combineReducers } from "redux";
import loginReducer from "./loginReducer";

const rootReducer = combineReducers({
  // 앞으로 생성할 리듀서 추가
  loginReducer: loginReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
