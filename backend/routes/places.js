const router = require('express').Router();
let Place = require('../models/place.model');

router.route('/').get((request, response) => {
    Place.find()
    .then(places => response.json(places))
    .catch(e => response.status(400).json('Error: ' + e));
});

router.route('/add').post((request, response) => {
    const name = request.body.name;
    const newPlace = new Place({name});

    newPlace.save()
        .then(() => response.json('Place added'))
        .catch(e => response.status(400).json('Error: ' + e)
    );

});

router.route('/:id').get((request, response) => {
    Place.findById(request.params.id)
    .then(place => response.json(place))
    .catch(e => response.status(400).json('Error: ' + e));
});

router.route('/:id').delete((request, response) => {
    Place.findByIdAndDelete(request.params.id)
    .then(() => response.json("Place deleted"))
    .catch(e => response.status(400).json('Error: ' + e));
});

router.route('/update/:id').post((request, response) => {
    Place.findById(request.params.id)
    .then((place) => {
        place.name = request.body.name;

        place.save()
            .then(() => response.json('Place updated'))
            .catch(e => response.status(400).json('Error: ' + e))
        ;
    })
    .catch(e => response.status(400).json('Error: ' + e));
});

router.route('/add').post((request, response) => {
    const name = request.body.name;
    const newPlace = new Place({name});

    newPlace.save()
        .then(() => response.json('Place added'))
        .catch(e => response.status(400).json('Error: ' + e)
    );

});

module.exports = router;