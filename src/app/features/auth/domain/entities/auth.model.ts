export enum AuthTab {
  LOGIN = 'LOGIN',
  SIGN_UP = 'SIGN_UP',
}

export const AuthTabsIndex: Record<AuthTab, number> = {
  [AuthTab.LOGIN]: 0,
  [AuthTab.SIGN_UP]: 1,
};
