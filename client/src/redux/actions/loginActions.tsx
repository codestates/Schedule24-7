export const LOG_IN = "LOG_IN" as const;
export const LOG_OUT = "LOG_OUT" as const;
export const SOCIAL_LOG_IN = "SOCIAL_LOG_IN" as const;
export const SOCIAL_LOG_OUT = "SOCIAL_LOG_OUT" as const;

export const loginChange = () => ({
  type: LOG_IN,
});

export const logoutChange = () => ({
  type: LOG_OUT,
});

export const SocialLoginChange = () => ({
  type: SOCIAL_LOG_IN,
});

export const SocialLogoutChange = () => ({
  type: SOCIAL_LOG_OUT,
});
