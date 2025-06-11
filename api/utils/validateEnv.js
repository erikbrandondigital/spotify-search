exports.validateEnv = () => {
  const PORT = process.env.PORT;
  const API_BASE_URL = process.env.API_BASE_URL;
  const DATABASE_URL = process.env.DATABASE_URL;
  const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

  let errorMessages = [];

  if (!PORT) {
    errorMessages.push(
      'Error: Missing PORT environment variable in .env. Set it to an open port number & try again.',
    );
  }

  if (!API_BASE_URL) {
    errorMessages.push(
      'Error: Missing API_BASE_URL environment variable in .env. Set it to a local or live URL & try again.',
    );
  }

  if (!DATABASE_URL) {
    errorMessages.push(
      'Error: Missing DATABASE_URL environment variable in .env. Set it to a MongoDB URL & try again.',
    );
  }

  if (!SPOTIFY_CLIENT_ID) {
    errorMessages.push(
      'Error: Missing SPOTIFY_CLIENT_ID environment variable in .env. Make sure you added your Spotify Client ID & try again.',
    );
  }

  if (!SPOTIFY_CLIENT_SECRET) {
    errorMessages.push(
      'Error: Missing SPOTIFY_CLIENT_SECRET environment variable in .env. Make sure you added your Spotify Client Secret & try again.',
    );
  }

  if (errorMessages.length > 0) {
    exitWithErrorMessages(errorMessages);
  } else {
    return { PORT, DATABASE_URL, SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET };
  }
};

const exitWithErrorMessages = (messages) => {
  messages.forEach((message) => {
    console.error(message);
  });

  process.exitCode = 1;
  process.exit();
};
