import { setupServer } from 'msw/node';

import mockApiHandlers from './mockApiHandlers';

// This configures a request mocking server for NodeJS with the given request handlers.
const mockServerNode = setupServer(...mockApiHandlers);

export default mockServerNode;
