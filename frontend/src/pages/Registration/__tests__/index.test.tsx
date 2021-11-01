import { waitFor, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import render, { history } from '../../../shared/testUtils/setup';
import Selectors from '../../../shared/testUtils/selectors';

describe('Tests for Registration page', () => {
  let renderedApp: RenderResult;

  beforeEach(() => {
    history.push('/register');
    renderedApp = render();
  });

  it('should successfully render the registration page', async () => {
    const { container } = renderedApp;

    expect(
      container.querySelector(Selectors.REGISTRATION_FORM),
    ).toBeInTheDocument();
  });

  it('should show field validation messages', async () => {
    const { container } = renderedApp;

    expect(
      container.querySelector(Selectors.REGISTRATION_FORM),
    ).toBeInTheDocument();

    expect(container.querySelector(Selectors.SUBMIT_BUTTON)).toBeDisabled();

    userEvent.type(
      container.querySelector(Selectors.FULL_NAME_INPUT_FIELD) as Element,
      'test',
    );

    userEvent.type(
      container.querySelector(Selectors.EMAIL_INPUT_FIELD) as Element,
      'test',
    );

    userEvent.type(
      container.querySelector(Selectors.PASSWORD_INPUT_FIELD) as Element,
      'test',
    );

    userEvent.tab();

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.FULL_NAME_INPUT_FIELD_VALIDATION_MSG),
      ).toHaveTextContent('Full name must be atleast 5 characters'),
    );

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.EMAIL_INPUT_FIELD_VALIDATION_MSG),
      ).toHaveTextContent('Email must be valid'),
    );

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.PASSWORD_INPUT_FIELD_VALIDATION_MSG),
      ).toHaveTextContent(
        'Password must be atleast 8 characters and must contain atleast a digit and a character',
      ),
    );
  });

  it('should test all cases for password regex', async () => {
    const { container } = renderedApp;

    expect(
      container.querySelector(Selectors.REGISTRATION_FORM),
    ).toBeInTheDocument();

    // less than 8 characters - error
    userEvent.type(
      container.querySelector(Selectors.PASSWORD_INPUT_FIELD) as Element,
      'test',
    );

    userEvent.tab();

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.PASSWORD_INPUT_FIELD_VALIDATION_MSG),
      ).toHaveTextContent(
        'Password must be atleast 8 characters and must contain atleast a digit and a character',
      ),
    );

    // all letters no digit - error
    userEvent.type(
      container.querySelector(Selectors.PASSWORD_INPUT_FIELD) as Element,
      'testpassword',
    );

    userEvent.tab();

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.PASSWORD_INPUT_FIELD_VALIDATION_MSG),
      ).toHaveTextContent(
        'Password must be atleast 8 characters and must contain atleast a digit and a character',
      ),
    );

    // all digits no letter - error
    userEvent.type(
      container.querySelector(Selectors.PASSWORD_INPUT_FIELD) as Element,
      '123456789',
    );

    userEvent.tab();

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.PASSWORD_INPUT_FIELD_VALIDATION_MSG),
      ).toHaveTextContent(
        'Password must be atleast 8 characters and must contain atleast a digit and a character',
      ),
    );

    // valid password - min 8 char and atleast a digit and a char
    userEvent.type(
      container.querySelector(Selectors.PASSWORD_INPUT_FIELD) as Element,
      'passw0rd123',
    );

    userEvent.tab();

    await waitFor(() =>
      expect(
        container.querySelector(Selectors.PASSWORD_INPUT_FIELD_VALIDATION_MSG),
      ).not.toBeInTheDocument(),
    );
  });

  it('should successfully register user', async () => {
    const { container } = renderedApp;

    expect(
      container.querySelector(Selectors.REGISTRATION_FORM),
    ).toBeInTheDocument();

    userEvent.type(
      container.querySelector(Selectors.FULL_NAME_INPUT_FIELD) as Element,
      'John Doe',
    );

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

    // expect to land on dashboard page on success registration
    await waitFor(() =>
      expect(
        container.querySelector(Selectors.WELCOME_MESSAGE),
      ).toHaveTextContent('Welcome John Doe'),
    );
  });
});
