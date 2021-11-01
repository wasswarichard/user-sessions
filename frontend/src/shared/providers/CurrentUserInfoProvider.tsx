import { createContext, useContext } from 'react';

import { CurrentUserInfoState, RequestDispatch } from '../types';

interface ProviderValue {
  currentUserInfoState: CurrentUserInfoState;
  currentUserInfoDispatch: RequestDispatch;
}

interface Props {
  children: JSX.Element;
  value: ProviderValue;
}

const CurrentUserInfoContext =
  createContext<ProviderValue | undefined>(undefined);

const CurrentUserInfoProvider = ({
  children,
  value: { currentUserInfoState, currentUserInfoDispatch },
}: Props) => {
  return (
    <CurrentUserInfoContext.Provider
      value={{ currentUserInfoState, currentUserInfoDispatch }}
    >
      {children}
    </CurrentUserInfoContext.Provider>
  );
};

const useCurrentUserInfoContext = () => {
  const context = useContext(CurrentUserInfoContext);
  if (context === undefined) {
    throw new Error(
      'useCurrentUserInfoContext must be used within a CurrentUserInfoProvider',
    );
  }
  return context;
};

export { CurrentUserInfoProvider, useCurrentUserInfoContext };
