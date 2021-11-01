import { RequestActionType, UserPayload, RequestDispatch } from '../types';
import useNotification from '../hooks/useNotification';

const useRegisterUser = (currentUserInfoDispatch: RequestDispatch) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT as string;

  const notification = useNotification();

  const registerUser = async (userPayload: UserPayload) => {
    currentUserInfoDispatch({
      type: RequestActionType.REQUEST_LOADING,
    });

    let response: any;

    try {
      const currentUserInfo = await fetch(
        `${API_ENDPOINT}/api/users/register`,
        {
          method: 'post',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userPayload),
        },
      );

      response = await currentUserInfo.json();

      if (response.errors) {
        notification({
          message: response.errors[0].message,
          variant: 'error',
        });

        currentUserInfoDispatch({
          type: RequestActionType.REQUEST_FAILURE,
          payload: response.errors,
        });
      } else {
        currentUserInfoDispatch({
          type: RequestActionType.REQUEST_SUCCESS,
          payload: response,
        });
      }
    } catch (error) {
      currentUserInfoDispatch({
        type: RequestActionType.REQUEST_FAILURE,
      });
    }
  };

  return { registerUser };
};

export default useRegisterUser;
