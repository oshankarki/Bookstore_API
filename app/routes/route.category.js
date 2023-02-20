const CategoryController = require('../controllers/controller.category');

const router = require('express').Router();

router.route('/')
    .get(CategoryController.list)
    .post(CategoryController.store);

module.exports = router;