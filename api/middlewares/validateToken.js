const UserToken = require('../models/userToken');

const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';

const API_BASE_URL = process.env.API_BASE_URL;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

exports.validateToken = async (req, res, next) => {
  try {
    const { id } = req.query;

    let userToken = await UserToken.findOne({ _id: id });

    if (!userToken) {
      console.log('Token Does Not Exist. Re-Authorizing...');
      res.status(403).json({ message: 'Unauthorized' });
      return;
    }
    const currentTime = new Date().getTime();
    const tokenExpirationTime =
      new Date(userToken.updatedAt).getTime() + userToken.expires_in * 1000;

    if (currentTime >= tokenExpirationTime) {
      console.log('Existing Token Expired. Refreshing...');
      userToken = await refreshToken(userToken.refresh_token, userToken._id);
    }

    console.log('Existing Token Valid. Proceeding...');
    res.locals.token_type = userToken.token_type;
    res.locals.access_token = userToken.access_token;
    next();
  } catch (error) {
    console.error(error);
  }
};

const refreshToken = async (refresh_token, userTokenId) => {
  const queryParams = new URLSearchParams({
    grant_type: 'refresh_token',
    refresh_token,
  });

  const refreshedToken = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
    method: 'POST',
    body: queryParams,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: 'Basic ' + new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64'),
    },
  }).then((response) => response.json());

  try {
    const updatedToken = await UserToken.findByIdAndUpdate({ _id: userTokenId }, refreshedToken, {
      new: true,
    });
    return updatedToken;
  } catch (error) {
    console.error(error);
  }
};
