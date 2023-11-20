const mongoose = require('mongoose');

exports.connectDB = () => {
    const DATABASE_URL =
        process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017/spotifyDB';

    mongoose.connect(DATABASE_URL, { useNewUrlParser: true });
    const db = mongoose.connection;

    db.on('error', (error) => {
        console.error(error);
    });

    db.once('open', () => {
        console.log(
            `MongoDB Connection Established > DATABASE_URL = ${DATABASE_URL}`
        );
    });
};
