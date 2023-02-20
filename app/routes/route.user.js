const UserController = require('../controllers/controller.user');
const router = require('express').Router();

const adminSchema = require('../validators/validator.admin');
const validate = require('../middlewares/middleware.validator');

router.route('/')
    .get(UserController.list)
    .post(validate(adminSchema), UserController.store)

router.route('/:id')
    .delete(UserController.destroy);

module.exports = router;