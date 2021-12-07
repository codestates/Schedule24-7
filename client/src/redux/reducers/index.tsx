import { combineReducers } from "redux";
import groupReducer from "./groupReducers";
import loginReducer from "./loginReducer";
import scheduleReducer from "./scheduleReducers";

interface RootReducer {
  loginReducer: ReturnType<typeof loginReducer>;
  group: ReturnType<typeof groupReducer>;
  scheduleReducer: ReturnType<typeof scheduleReducer>;
}

const rootReducer = combineReducers<RootReducer>({
  // 앞으로 생성할 리듀서 추가
  loginReducer: loginReducer,
  scheduleReducer: scheduleReducer,
  group: groupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
