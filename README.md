# Onboarding Portal Project
A webapp which displays content to introduce new starters to the digital department in Companies House.

## Technologies
- [Node](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [Nunjucks](https://mozilla.github.io/nunjucks/)

## Environment Variables
Create a file named '.env' at the root of the project and include environment variables in this file.

The following is a list of mandatory environment variables for the service to run:

Name                    | Description                            | Example Value
----------------------- | ------------------------------------   | -----------------------------------------------
CMS_API                 | The URL of the backend STRAPI api      | http://localhost:1337
PATH_PREFIX             | The prefix to any routes for the webapp| /portal 

## Running locally
The webapp will run locally on localhost:3000, so ensure this port is free.

In the root directory of the project, run the following command to start the webapp:
```
npm run start
```
Navigate to http://localhost:3000 in your browser to see the landing page.

## Building with Docker
To build a docker image for this app run the following command
```
docker build -t onboarding-portal-webapp .
```
To start a docker container with the image run the following
```
docker run -p 127.0.0.1:3000:3000 onboarding-portal-webapp
```

The Webapp will then be accessible on `127.0.0.1:3000`

## Troubleshooting
If the webapp displays errors, ensure the CMS_API environment variable points to the correct URL and verify that the STRAPI api is running.
