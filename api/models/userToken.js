const mongoose = require('mongoose');

const userTokenSchema = new mongoose.Schema(
    {
        access_token: { type: String, required: true },
        token_type: { type: String, required: true },
        expires_in: { type: Number, required: true },
        refresh_token: { type: String, required: true },
        scope: { type: String, required: true }
    },
    { timestamps: true }
);

module.exports = mongoose.model('UserToken', userTokenSchema);
