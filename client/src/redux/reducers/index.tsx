import { combineReducers } from "redux";
import groupReducer from "./groupReducers";
import loginReducer from "./loginReducer";

interface RootReducer {
  loginReducer: ReturnType<typeof loginReducer>;
  group: ReturnType<typeof groupReducer>;
}

const rootReducer = combineReducers<RootReducer>({
  // 앞으로 생성할 리듀서 추가
  loginReducer: loginReducer,
  group: groupReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
