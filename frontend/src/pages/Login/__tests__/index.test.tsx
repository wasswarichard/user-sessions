import { waitFor, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import render, { history } from '../../../shared/testUtils/setup';
import Selectors from '../../../shared/testUtils/selectors';

describe('Tests for Login page', () => {
  let renderedApp: RenderResult;

  beforeEach(() => {
    history.push('/login');
    renderedApp = render();
  });

  it('should successfully render the login page', async () => {
    const { container } = renderedApp;

    expect(container.querySelector(Selectors.LOGIN_FORM)).toBeInTheDocument();
  });

  it('should show field validation messages', async () => {
    const { container } = renderedApp;

    expect(container.querySelector(Selectors.LOGIN_FORM)).toBeInTheDocument();

    expect(container.querySelector(Selectors.SUBMIT_BUTTON)).toBeDisabled();

    userEvent.type(
      container.querySelector(Selectors.EMAIL_INPUT_FIELD) as Element,
      'test',
    );

    userEvent.tab();

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.EMAIL_INPUT_FIELD_VALIDATION_MSG),
      ).toHaveTextContent('Email must be valid'),
    );

    // Hit tab twice to simulate skip filling password - expect to show validation message
    userEvent.tab();
    userEvent.tab();

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.PASSWORD_INPUT_FIELD_VALIDATION_MSG),
      ).toHaveTextContent('Password is required'),
    );
  });

  it('should successfully login user', async () => {
    const { container } = renderedApp;

    const loginForm = container.querySelector(Selectors.LOGIN_FORM);

    expect(loginForm).toBeInTheDocument();

    userEvent.type(
      container.querySelector(Selectors.EMAIL_INPUT_FIELD) as Element,
      'test@test.com',
    );

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.EMAIL_INPUT_FIELD),
      ).toHaveAttribute('value', 'test@test.com'),
    );

    userEvent.type(
      container.querySelector(Selectors.PASSWORD_INPUT_FIELD) as Element,
      'passw0rd',
    );

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.PASSWORD_INPUT_FIELD),
      ).toHaveAttribute('value', 'passw0rd'),
    );

    userEvent.click(
      container.querySelector(Selectors.SUBMIT_BUTTON) as Element,
    );

    // expect to land on dashboard page on success login
    await waitFor(() =>
      expect(
        container.querySelector(Selectors.WELCOME_MESSAGE),
      ).toHaveTextContent('Welcome John Doe'),
    );
  });
});
