const BannerController = require('../controllers/controller.banner');

const router = require('express').Router();

router.route('/')
    .get(BannerController.list)
    .post(BannerController.store);

module.exports = router;