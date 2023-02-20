const CouponController = require('../controllers/controller.coupon');

const router = require('express').Router();

router.route('/')
    .get(CouponController.list)
    .post(CouponController.store);
router.route('/:id')
    .delete(CouponController.destroy);

module.exports = router;