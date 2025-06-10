# Spotify Search

## Project Overview

This project uses the [Spotify Web API](https://developer.spotify.com/documentation/web/api) to allow users to search for music within Spotify's music library. The project contains a React frontend that provides users with the ability to sign in to the application using OAuth, providing access to their Spotify account. Upon signing in, users will then be able to search for music by Artist, Album, Track Name, etc. All search and OAuth requests are handled by an Express backend API which acts as a middleman between the application frontend and Spotify's Web APIs.

## Prerequisites

The following programming languages, package managers, services & web browsers are required to run the application.

- NodeJS >= v20.9.0
- NPM >= v10.1.0
- MongoDB Server >= v6.0.6 Community
- Chrome/Firefox/Safari/Edge >= Latest 2 major versions.

## Getting Started

To get the project up and running make sure that you have all of the required prerequisites listed in the previous section installed on your system. Then follow the steps below:

1. Copy the `.env.dist` file and rename it to `.env` & update the environment variables to your desired settings.
2. Run `npm install` to install all dependencies.
3. Run `npm start` or `npm run dev` to start the Express backend server & React frontend.

### NPM Scripts Reference

**Important Note:** In production, the React build is served statically by the backend API so the backend API must be running in order to view the React frontend in the browser.

**Production:**

- `npm start` = Start the production Express backend & React frontend.
- `npm run start:api` = Start the production Express backend only.
- `npm run start:react` = Build the production React frontend only.

**Development:**

- `npm run dev` = Start the development Express backend & React frontend.
- `npm run dev:api` = Start the development Express backend only.
- `npm run dev:react` = Start the development React frontend only.
- `npm run lint:react` = Lint the React frontend using eslint.

## Links & Endpoints

- React Frontend = `http://localhost:3000/`
- Express Backend Login (Spotify OAuth Authorization) = `http://localhost:3000/spotify/v1/login`
- Express Backend Callback (Spotify OAuth Token Retrieval) = `http://localhost:3000/spotify/v1/callback`
- Express Backend Search = (Spotify Search Endpoint) `http://localhost:3000/spotify/v1/search`
