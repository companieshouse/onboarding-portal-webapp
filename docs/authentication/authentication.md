# Authentication
The onboarding portal webapp is public facing, exposing the home page. Further access to the webapp requires sign-in with a valid companies house email.

## Validation
Currently, there is no validation on the email that the user registers with. 

The goal is to implement validation which only allows accounts to be registered using an email with the `@companieshouse.gov.uk` domain.

## Verification
Currently, there is no verification of a user when they register an account with the onboarding portal.

The goal is to implement verification of users, which will send a `verify your account` email to their provided email address.