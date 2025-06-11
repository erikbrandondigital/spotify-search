# Spotify Search

## Project Overview

This project uses the [Spotify Web API](https://developer.spotify.com/documentation/web/api) to allow users to search for music within Spotify's music library. The project contains a React frontend that provides users with the ability to sign in to the application using OAuth, providing access to their Spotify account. Upon signing in, users will then be able to search for music by Artist, Album, Track Name, etc. All search and OAuth requests are handled by an Express backend API which acts as a middleman between the application frontend and Spotify's Web APIs.

### Copyright & Trademark Disclaimer

 All Spotify trademarks, service marks, trade names, logos, domain names, and any other features of the Spotify brand ("**Spotify Brand Features**") are the sole property of Spotify or its licensors. The usage of the Spotify trademark, service mark, trade name, and logo, within this project is for informational and educational purposes only and does not imply any endorsement by or affiliation with Spotify USA, Inc.

## Prerequisites

The following programming languages, package managers, services & web browsers are required to run the application.

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) or [Docker Engine](https://docs.docker.com/engine/install/)
- [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) (Optional but Recommended)
- NodeJS >= v20.9.0
- NPM >= v10.1.0
- MongoDB Server >= v6.0.6 Community
- Chrome/Firefox/Safari/Edge >= Latest 2 major versions.
- A [Spotify Developer Account](https://developer.spotify.com) with an Application **Client ID** & **Client Secret**
  1.  Create an account or Log into the [Spotify Developers Dashboard](https://developer.spotify.com/dashboard)
  2.  Click **Create app** button
      1. Fill in the **App Name** (example: Music Search)
      2. Fill in the **App Description**
      3. Fill in **Redirect URI** with `http://127.0.0.1:3000/spotify/v1/callback` & Click **Add**
      4. For **Which API/SDKs are you planning to use?**, select **Web API**.
      5. Check the checkbox for the **Terms of Service and Design Guidelines**.
      6. Click **Save**.
      7. Copy & save the **Client ID** for later.
      8. Click the **View client secret** link located below the **Client ID**
      9. Copy & save the **Client Secret** for later.
  3.  Proceed to the [Install](#install) section of this README.

## Install

To get the project up and running make sure that you have all of the required prerequisites listed in the previous section installed on your system. Then follow the steps below:

1. Clone the **main** branch of the repo to your machine.

```
git clone https://github.com/erikbrandondigital/spotify-search.git
```

2. Open the **Project Folder**:

```
cd spotify-search
```

3. Create two **.env** files in the **api** and **reactjs** folders by copying & renaming each **.env.example** file to **.env**.

```
cp api/.env.example api/.env && cp reactjs/.env.example reactjs/.env
```

4. Update the Environment Variables in each folder to your desired settings using the [Environment Variables Reference](#environment-variables-reference) section.
   - Don't forget to add your Spotify Developer **Client ID** and **Client Secret** to the **API .env** file.
5. Run `docker-compose up --build -d` to build and start the application.
   - You can skip the `--build` flag if you already built the application before or the `-d` flag if you want to attach to the Docker container when the application starts up.

## Uninstall

To uninstall the project, follow the steps below:

1. Run `docker-compose down -v` to stop and delete the running Docker containers and the network and storage volumes.
   - You can skip the `-v` flag if you want to keep the data stored in the database.
2. Delete the project folder from your machine and uninstall anything in the [Prerequisites](#prerequisites) section that you no longer want to keep.

### Environment Variables Reference

Below are two tables containing the Environment Variables that can be set and or customized on the React frontend and Express backend. All Environment Variables listed below are required to successfully run the application.

#### React

| Environment Variable    | Default Value                       | Purpose                                                            |
| ----------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| `API_BASE_URL`          | `http://localhost:3000`             | Local or Live URL of the API.                                      |
| `PORT`                  | `3000`                              | Port Number for the API.                                           |
| `DATABASE_URL`          | `mongodb://mongodb:27017/spotifyDB` | A MongoDB connection string containing the table name (spotifyDB). |
| `SPOTIFY_CLIENT_ID`     | `your-client-id`                    | Your Spotify Developer application's Client ID.                    |
| `SPOTIFY_CLIENT_SECRET` | `your-client-secret`                | Your Spotify Developer application's Client Secret.                |

#### Express

| Environment Variable | Default Value         | Purpose                       |
| -------------------- | --------------------- | ----------------------------- |
| `API_BASE_URL`       | http://localhost:3000 | Local or Live URL of the API. |

### NPM Scripts Reference

**Important Note:** The React build is served statically by the backend API so the backend API must be running in order to view the React frontend in the browser.

#### React package.json

| NPM Command        | Purpose                                         |
| ------------------ | ----------------------------------------------- |
| `npm run build`    | Builds the React frontend.                      |
| `npm run dev`      | Starts the React frontend in a Vite dev server. |
| `npm run lint`     | Lints the React frontend.                       |
| `npm run lint:fix` | Lints, fixes & formats the React frontend.      |

#### Express package.json

| NPM Command        | Purpose                                     |
| ------------------ | ------------------------------------------- |
| `npm start`        | Starts the Express backend using Node.      |
| `npm run dev`      | Starts Express backend using Nodemon.       |
| `npm run lint`     | Lints the Express backend.                  |
| `npm run lint:fix` | Lints, fixes & formats the Express backend. |

### Links & Endpoints Reference

Below is a table containing the various URLs and endpoints available for you to interact with when the application is up and running.

| Name                                 | Link/Endpoint                             |
| ------------------------------------ | ----------------------------------------- |
| Frontend Application                 | http://localhost:3000/                    |
| API Search                           | http://localhost:3000/spotify/v1/search   |
| API Login (OAuth Authorization)      | http://localhost:3000/spotify/v1/login    |
| API Callback (OAuth Token Retrieval) | http://localhost:3000/spotify/v1/callback |
