export interface CurrentUserInfo {
  id: number;
  fullName: string;
  email: string;
}

export interface ValidationError {
  message: string;
  field?: string;
}

export interface CurrentUserInfoState {
  data: CurrentUserInfo | null;
  loading: boolean;
  error: ValidationError[] | null;
}

export enum RequestActionType {
  REQUEST_LOADING = 'REQUEST_LOADING',
  REQUEST_SUCCESS = 'REQUEST_SUCCESS',
  REQUEST_FAILURE = 'REQUEST_FAILURE',
}

export interface RequestAction {
  type: 'REQUEST_LOADING' | 'REQUEST_SUCCESS' | 'REQUEST_FAILURE';
  payload?: any;
}

export type RequestDispatch = (action: RequestAction) => void;

export interface UserPayload {
  fullName?: string;
  email: string;
  password: string;
}
