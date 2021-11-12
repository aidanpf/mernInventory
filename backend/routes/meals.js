const router = require('express').Router();
let Meal = require('../models/meal.model');

router.route('/').get((request, response) => {
    Meal.find()
    .then(meals => response.json(meals))
    .catch(e => response.status(400).json('Error: ' + e));
});

router.route('/add').post((request, response) => {
    const name = request.body.name;
    const newMeal = new Meal({name});

    newMeal.save()
        .then(() => response.json('Meal added'))
        .catch(e => response.status(400).json('Error: ' + e)
    );

});

module.exports = router;