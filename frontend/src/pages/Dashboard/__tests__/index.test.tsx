import { waitFor, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import render, { history } from '../../../shared/testUtils/setup';
import Selectors from '../../../shared/testUtils/selectors';

describe('Tests for Dashboard page', () => {
  let renderedApp: RenderResult;

  beforeEach(async () => {
    history.push('/login');
    renderedApp = render();

    const { container } = renderedApp;

    userEvent.type(
      container.querySelector(Selectors.EMAIL_INPUT_FIELD) as Element,
      'test@test.com',
    );

    userEvent.type(
      container.querySelector(Selectors.PASSWORD_INPUT_FIELD) as Element,
      'passw0rd',
    );

    userEvent.click(
      container.querySelector(Selectors.SUBMIT_BUTTON) as Element,
    );

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.WELCOME_MESSAGE),
      ).toHaveTextContent('Welcome John Doe'),
    );
  });

  it('should successfully render dashboard page with welcome message', async () => {
    const { container } = renderedApp;
    // expect welcome message on dashboard
    await waitFor(() =>
      expect(
        container.querySelector(Selectors.WELCOME_MESSAGE),
      ).toHaveTextContent('Welcome John Doe'),
    );
  });

  it('should successfully logout the user', async () => {
    const { container } = renderedApp;

    const logoutLink = container.querySelector(
      Selectors.LOGOUT_LINK,
    ) as Element;

    userEvent.click(logoutLink);

    // expect navigation to login page on successful logout
    await waitFor(() =>
      expect(container.querySelector(Selectors.LOGIN_FORM)).toBeInTheDocument(),
    );
  });
});
