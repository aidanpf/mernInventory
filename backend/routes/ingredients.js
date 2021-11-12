const router = require('express').Router();
let Item = require('../models/ingredient.model');

router.route('/').get((request, response) => {
    Item.find()
    .then(ingredients => response.json(ingredients))
    .catch(e => response.status(400).json('Error: ' + e));
});

router.route('/:id').get((request, response) => {
    Item.findById(request.params.id)
    .then(ingredient => response.json(ingredient))
    .catch(e => response.status(400).json('Error: ' + e));
});

router.route('/:id').delete((request, response) => {
    Item.findByIdAndDelete(request.params.id)
    .then(() => response.json("Item deleted"))
    .catch(e => response.status(400).json('Error: ' + e));
});

router.route('/update/:id').post((request, response) => {
    Item.findById(request.params.id)
    .then((ingredient) => {
        ingredient.name = request.body.name;

        ingredient.save()
            .then(() => response.json('Item updated'))
            .catch(e => response.status(400).json('Error: ' + e))
        ;
    })
    .catch(e => response.status(400).json('Error: ' + e));
});

router.route('/add').post((request, response) => {
    const name = request.body.name;
    const newItem = new Item({name});

    newItem.save()
        .then(() => response.json('Item added'))
        .catch(e => response.status(400).json('Error: ' + e)
    );

});

module.exports = router;