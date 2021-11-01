import { useReducer } from 'react';

import {
  CurrentUserInfoState,
  RequestAction,
  RequestActionType,
} from '../types';

const useCurrentUserInfoReducer = () => {
  const state: CurrentUserInfoState = {
    data: null,
    loading: false,
    error: null,
  };

  const currentUserInfoReducer = (
    state: CurrentUserInfoState,
    action: RequestAction,
  ) => {
    switch (action.type) {
      case RequestActionType.REQUEST_LOADING: {
        return { ...state, loading: true };
      }
      case RequestActionType.REQUEST_SUCCESS: {
        return { ...state, loading: false, data: action.payload };
      }
      case RequestActionType.REQUEST_FAILURE: {
        return {
          ...state,
          loading: false,
          data: null,
          error: action.payload,
        };
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  };

  const [currentUserInfoState, currentUserInfoDispatch] = useReducer(
    currentUserInfoReducer,
    state,
  );

  return {
    currentUserInfoReducer,
    currentUserInfoState,
    currentUserInfoDispatch,
  };
};

export default useCurrentUserInfoReducer;
