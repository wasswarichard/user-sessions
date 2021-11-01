import { RequestActionType, RequestDispatch } from '../types';

const useGetCurrentUserInfo = (currentUserInfoDispatch: RequestDispatch) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT as string;

  const getCurrentUserInfo = async () => {
    currentUserInfoDispatch({
      type: RequestActionType.REQUEST_LOADING,
    });

    try {
      const currentUserInfo = await fetch(
        `${API_ENDPOINT}/api/users/currentuser`,
        {
          method: 'get',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      const { currentUser } = await currentUserInfo.json();

      currentUserInfoDispatch({
        type: RequestActionType.REQUEST_SUCCESS,
        payload: currentUser,
      });
    } catch (error) {
      currentUserInfoDispatch({
        type: RequestActionType.REQUEST_FAILURE,
      });
    }
  };

  return { getCurrentUserInfo };
};

export default useGetCurrentUserInfo;
