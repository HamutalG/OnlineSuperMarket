var express = require('express');
var router = express.Router();
var Cart = require('../models/cart');
var Order = require('../models/order');


router.get('/userOrderDetails', async function (req, res, next) {
    try {
        let obj = {};
        obj.orders = await Order.find({ customerId: req.query['id'] });
        obj.cart = await Cart.findOne({ customerID: req.query['id'] });
        res.json(obj);
    } catch (e) {
        res.error({hasError:'error'});
    };
});


router.post('/addCart', function (req, res, next) {

    Cart.find({ customerID: req.body.customerID }).then(cart => {
        if (!cart.length > 0) {

            new Cart(req.body).save()
                .then(result => res.json(result))
                .catch(error => {
                    if (error)
                        res.json({ hasError: error });
                });

        } else {
            req.body.cartDate = new Date();
            Cart.findOneAndUpdate({ customerID: req.body.customerID }, req.body, { new: true })
                .then(result => { res.json(result) })
                .catch(error => {
                    if (error)
                        res.json({ hasError: error });
                });

        }
    });
});

router.put('/updateCart', function (req, res, next) {

    var id = req.body._id;
    req.body.cartDate = new Date();
    Cart.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        .then(result => { res.json(result) })
        .catch(error => {
            if (error)
                res.json({ hasError: error });
        });
});

router.get('/getCart', async function (req, res, next) {
    let query = req.query['query'];
    let cart = await Cart.find({ customerID: query });
    if (cart.length > 0) {
        cart = cart[cart.length - 1];
        res.json(cart);
    } else {
        res.json({ hasError: 'no cart' });
    }
});



module.exports = router;
