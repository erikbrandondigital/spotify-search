require('dotenv').config({ path: '../.env' });
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

const { capitalizeFirstLetter } = require('./utils/utils');
const { connectToMongoose } = require('./middlewares/connectToMongo');

const spotifyRouter = require('./routes/spotifyRouter');

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

connectToMongoose();

const app = express();

if (NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../reactjs/dist')));

app.use('/spotify/v1', spotifyRouter);

app.use('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../reactjs/dist', 'index.html'));
});

app.all('/*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(
        `${capitalizeFirstLetter(
            process.env.NODE_ENV
        )} Backend Server Running - PORT = ${PORT}`
    );
});
