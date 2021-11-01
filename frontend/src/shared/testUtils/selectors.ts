enum Selectors {
  LOADER = 'loader',
  COMPANY_LOGO = 'company-logo',
  WELCOME_MESSAGE = "[data-testid='welcome-msg']",
  LAYOUT_CHILD = 'layout-child',
  PROFILE_PIC = 'profile-pic',
  LOGOUT_LINK = "[data-testid='logout-link']",
  LOGIN_FORM = "[data-testid='login-form']",
  EMAIL_INPUT_FIELD = "[data-testid='email'] input[id='email']",
  EMAIL_INPUT_FIELD_VALIDATION_MSG = "[data-testid='email'] p[id='email-helper-text']",
  PASSWORD_INPUT_FIELD = "[data-testid='password'] input[id='password']",
  PASSWORD_INPUT_FIELD_VALIDATION_MSG = "[data-testid='password'] p[id='password-helper-text']",
  RESET_BUTTON = "[data-testid='reset-btn']",
  SUBMIT_BUTTON = "[data-testid='submit-btn']",
  REGISTRATION_FORM = "[data-testid='registration-form']",
  FULL_NAME_INPUT_FIELD = "[data-testid='fullName'] input[id='fullName']",
  FULL_NAME_INPUT_FIELD_VALIDATION_MSG = "[data-testid='fullName'] p[id='fullName-helper-text']",
}

export default Selectors;
