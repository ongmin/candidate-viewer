# Candidate Viewer App


## Description

Built using create-react-app and express.
Simple practice for react app with viewing function and pagination.

No CSS pre- and post-processors nor application state management libraries (eg. Redux) used because it is a simple app and there's no real need. The parent App component can be the one source of application state.

Build to support latest google chrome browser

## Scripts

1. Install project dependencies
```
yarn install
cd client
yarn install
cd ..
```

2. To start the server and client at the same time (from the root of the project)
```
yarn launch
```

## To deploy

To deploy to heroku, use the following two scripts
```
start
heroku-postbuild
```
