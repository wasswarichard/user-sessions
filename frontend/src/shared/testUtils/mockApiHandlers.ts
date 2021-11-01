import { rest, RestRequest } from 'msw';

import { currentUserInfo } from './mockData';

const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT as string;

const getCurrentUserInfo = (req: RestRequest, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json(currentUserInfo));
};

const loginUser = (req: RestRequest, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json({ ...currentUserInfo }));
};

const logoutUser = (req: RestRequest, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json({}));
};

const registerUser = (req: RestRequest, res: any, ctx: any) => {
  return res(ctx.status(200), ctx.json({ ...currentUserInfo }));
};

// bind handlers to paths
const mockApiHandlers = [
  rest.get(`${API_ENDPOINT}/api/users/currentuser`, getCurrentUserInfo),
  rest.post(`${API_ENDPOINT}/api/users/login`, loginUser),
  rest.post(`${API_ENDPOINT}/api/users/logout`, logoutUser),
  rest.post(`${API_ENDPOINT}/api/users/register`, registerUser),
];
export default mockApiHandlers;
