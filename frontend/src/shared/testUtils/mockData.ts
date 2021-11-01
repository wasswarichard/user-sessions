import { CurrentUserInfo, CurrentUserInfoState } from '../types';

export const currentUserInfo: CurrentUserInfo = {
  id: 1,
  fullName: 'John Doe',
  email: 'test@test.com',
};

export const currentUserInfoState: CurrentUserInfoState = {
  data: currentUserInfo,
  loading: false,
  error: null,
};
