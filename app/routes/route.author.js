const AuthorController = require('../controllers/controller.author');

const router = require('express').Router();

router.route('/')
    .get(AuthorController.list)
    .post(AuthorController.store);
router.route('/:id')
    .delete(AuthorController.destroy);

module.exports = router;