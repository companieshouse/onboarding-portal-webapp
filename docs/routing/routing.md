# Routing
The onboarding portal webapp is public facing, exposing the home page. Further access to the webapp requires sign-in with a valid companies house email.

## Routes
`GET /` Returns the Home page. (Public)

`GET /login` Returns the login page. (Public)

`POST /login` Posts login data to the webapp for user signin. (Public)

`GET /register` Returns the register page. (Public)

`POST /register` Posts user registration data to the webapp for account registration. (Public)

`GET /information-hub` Returns the information hub containing CH information for new starters. (Requires sign-in)

`GET /page/{page_id}` Returns a page using the page_id provided by STRAPI. E.g., /page/new-starter returns the page stored by STRAPI with the ID 'new-starter'. (Requires sign-in)

## Middleware
Currently, the implementation of 'public' vs 'private' facing endpoints is handled by the [userAuthMiddleware.ts](../../src/middleware/userAuthMiddleware.ts). The middleware is used for specific pages defined in [app.ts](../../src/app.ts) and will check if a person is signed in before accessing the page, if not, redirect to the login page. Any page that the middleware is not used for will be publicly available as the middleware will not check for user authentication first.