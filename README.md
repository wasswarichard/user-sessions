# user-service

A user management service with user registration, login, logout and session handling features.

[Live Demo](https://user-service-react-app.herokuapp.com/ 'user-service')

## Libraries/Frameworks used

- **Backend** : Express, TypeScript, Jest, SuperTest
- **Database & ORM** : PostgreSQL, TypeORM
- **Frontend** : React, TypeScript, Material UI, Jest, React Testing Library, mswjs

## Design decisions

### Backend

- **Design pattern** : The code is organised as controller-service-repository pattern to ensure loose coupling among
  these layers. Each layer abstracts implementation details from others.
- **Error handling** : An extensible error handling framework is created as middlewares under the `lib/errors` directory.
  These middlewares handle HTTP request and validation error in a consistent manner.
- **DB & ORM** : PostgreSQL is used as the persistent storage with TypeORM as the ORM providing type safety and entity management.
- **Security** : Passwords are hashed using scrypt before storing in DB. The `PasswordManager` class provides utility for hashing and password comparisons.
- **Testing** : All the REST APIs are tested using integration test cases using Jest and SuperTest.
- **Linting & Formatting** : The codebase is linted using ESLint and formatted using Prettier.

### Frontend

- **Design pattern** : The code is organised as context providers, reducers and hooks to facilitate reusability and functional programming approach. The `shared` directory contains all the reusable artifacts. The `pages` directory contain the navigable pages in the UI.
- **State management** : The application state is managed using context providers and useReducer()
- **Testing** : All the usecases are covered with integration testing using React testing library. The atomic components have unit tests using Jest. API mocking is done using [mswjs](https://mswjs.io/)
- **Component library** : Components and Grid system of material-ui is used
- **Component styling** : CSS-in-JS solution of material-ui is used
- **Linting & Formatting** : Uses the default ESLint config of CRA. Prettier for code formatting. husky and lint-staged are used as auxiliary library

## Browser compatibility

The application works as expected and is tested with latest versions of Chrome and Firefox. Safari has a known bug with cookie handling in older versions. For more info please refer: https://www.chromium.org/updates/same-site/incompatible-clients

## REST APIs

```
POST /api/users/register
POST /api/users/login
POST /api/users/logout
GET  /api/users/currentuser
```

Example success response

```javascript
{
    "id": 101,
    "fullName": "John Smith",
    "email": "abc@xyz.com"
}
```

Example error response

```javascript
{
    "errors": [
        {
            "message": "Fullname must be atleast 5 characters",
            "field": "fullName"
        },
        {
            "message": "Email must be valid",
            "field": "email"
        },
        {
            "message": "Password must be atleast 8 characters and must contain atleast a digit and a character",
            "field": "password"
        }
    ]
}
```

## To run locally

1. Download and install PostgreSQL
2. Install backend dependencies using `yarn install`
3. Create a `.env` file under `backend` directory and set the following environment variables (change the values as per your configuration):

```
JWT_KEY=sup3rs3cre1k3y
DB_HOST=localhost
DB_PORT=5432
DB_DATABASE=user_db
DB_USERNAME=mydbusername
DB_PASSWORD=mydbpassword
REACT_APP_ORIGIN=http://localhost:3000
```

4. Start the express server using `yarn start`. If everything goes well, you should see the following messages in console:

```
Connected to Postgres DB
Server listening on port 5000
```

Now that the express server is running, bootstrap the frontend:

5. Install frontend dependencies using `yarn install`
6. Create a `.env` file under `frontend` directory and set the following environment variables:

```
REACT_APP_API_ENDPOINT=http://localhost:5000
```

7. Start the frontend dev server unsing `yarn start`.

## Further improvements

- The service can be further improved by adding features like:
  - Change password
  - Reset password
  - Email verification in the registration process
  - Multi-factor Authentication (MFA)

## Test cases snapshot

Backend:

![Snapshot of backend cases](/docs/backend-testcases.png)

Frontend:

![Snapshot of backend cases](/docs/frontend-testcases.png)
