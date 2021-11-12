const mongoose = require("mongoose");

const mealSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
}, {
    timestamps: true
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;