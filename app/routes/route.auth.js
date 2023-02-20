const UserController = require('../controllers/controller.user');
const AuthController = require('../controllers/controller.auth');
const router = require('express').Router();

const userSchema = require('../validators/validator.user');
const loginSchema = require('../validators/validator.login');
const validate = require('../middlewares/middleware.validator');

router.post('/register', validate(userSchema), UserController.register);
router.post('/login', validate(loginSchema), AuthController.attemptLogin);
router.post('/refresh-token', AuthController.getNewAccessToken);


module.exports = router;