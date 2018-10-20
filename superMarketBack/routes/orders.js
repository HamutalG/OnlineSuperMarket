var express = require('express');
var router = express.Router();
var Order = require('../models/order');
var Cart = require('../models/cart');

router.post('/newOrder', function (req, res, next) {

    new Order(req.body).save()
        .then(result => {
            Cart.findOneAndUpdate({ customerID: req.body.customerId }, { products: [] })
                .then(res.json(result))
                .catch(res.json({ hasError: "err" }));
        })
        .catch(error => {
            if (error)
                res.json({ hasError: error });
        });
});

router.get('/OrdersNumber', function (req, res, next) {
    Order.find({}, function (err, orders) {
        res.json(orders.length);
    });
});


module.exports = router;
