const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

exports.middlewares = async (app) => {
    app.use(cors());
    app.use(express.json());
    app.use(express.static(path.join(__dirname, '../../reactjs/dist')));
    app.use(morgan('dev'));

    return app;
};
