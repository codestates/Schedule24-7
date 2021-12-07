interface Action<TypeString extends string, PayloadType = any> {
  type: TypeString;
  payload?: PayloadType;
}

type ActionCreater<TypeStirng extends string, PaylaodType = any> = (
  payload?: PaylaodType
) => Action<TypeStirng, PaylaodType>;

type Reducer<ReducerState, ReducerAction> = (
  state: ReducerState | undefined,
  action: ReducerAction
) => ReducerState;
