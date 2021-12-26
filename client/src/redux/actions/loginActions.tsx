export const LOG_IN = "LOG_IN" as const;
export const LOG_OUT = "LOG_OUT" as const;

export const loginChange = () => ({
  type: LOG_IN,
});

export const logoutChange = () => ({
  type: LOG_OUT,
});
