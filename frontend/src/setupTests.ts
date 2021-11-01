// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';

import mockServerNode from 'shared/testUtils/mockServerNode';

// Establish API mocking before all tests.
beforeAll(() => mockServerNode.listen({ onUnhandledRequest: 'warn' }));
// Reset any request handlers thaßt we may add during the tests, so they don't affect other tests.
afterEach(() => mockServerNode.resetHandlers());
// Clean up after the tests are finished.
afterAll(() => mockServerNode.close());
