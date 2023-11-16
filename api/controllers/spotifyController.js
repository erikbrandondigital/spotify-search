const crypto = require('crypto');
const UserToken = require('../models/userToken');

const SPOTIFY_AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SPOTIFY_SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';
const REDIRECT_URI = 'http://localhost:3000/spotify/v1/callback';

const API_BASE_URL = process.env.API_BASE_URL;
const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;

let STATE = null;

exports.login = async (req, res) => {
    const response_type = 'code';
    const scope = 'user-read-email';

    STATE = crypto.randomBytes(16).toString('hex');

    const queryParams = new URLSearchParams({
        redirect_uri: REDIRECT_URI,
        client_id: CLIENT_ID,
        state: STATE,
        response_type,
        scope
    });

    res.redirect(`${SPOTIFY_AUTH_ENDPOINT}?${queryParams}`);
};

exports.callback = async (req, res) => {
    const grant_type = 'authorization_code';

    const code = req.query.code || null;
    const requestState = req.query.state || null;

    if (!code || !requestState || STATE !== requestState)
        res.redirect(API_BASE_URL);

    const queryParams = new URLSearchParams({
        redirect_uri: REDIRECT_URI,
        grant_type,
        code
    });

    const newToken = await fetch(SPOTIFY_TOKEN_ENDPOINT, {
        method: 'POST',
        body: queryParams,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization:
                'Basic ' +
                new Buffer.from(CLIENT_ID + ':' + CLIENT_SECRET).toString(
                    'base64'
                )
        }
    }).then((response) => response.json());

    try {
        const newUser = await UserToken.create(newToken);
        res.redirect(`${API_BASE_URL}/?id=${newUser._id}`);
    } catch (error) {
        console.error(error);
    }
};

exports.logout = async (req, res) => {
    const { id } = req.query;

    try {
        await UserToken.deleteOne({ _id: id });
        res.status(200).json({ message: 'User Successfully Logged Out' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Unexpected Error' });
    }
};

exports.search = async (req, res, next) => {
    const { token_type, access_token } = res.locals;

    const queryParams = new URLSearchParams({
        q: req.query.q,
        type: req.query.type,
        market: req.query.market,
        limit: req.query.limit,
        offset: req.query.offset
    });

    try {
        const artists = await fetch(
            `${SPOTIFY_SEARCH_ENDPOINT}?${queryParams}`,
            {
                method: 'GET',
                headers: { Authorization: `${token_type} ${access_token}` }
            }
        ).then((response) => response.json());
        res.status(200).json(artists);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message || 'Unexpected Error' });
    }
};
