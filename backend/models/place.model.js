const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
}, {
    timestamps: true
});

const Place = mongoose.model('Place', placeSchema);

module.exports = Place;