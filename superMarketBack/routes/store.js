var express = require('express');
var router = express.Router();
var Product = require('../models/product');
var Category = require('../models/category');
const Order = require('../models/order');

router.get('/categories', function (req, res, next) {
    Category.find({}, function (err, categories) {
        var categoriesArr = [];

        categories.forEach(function (category) {
            categoriesArr.push(category);
        });
        res.json(categoriesArr)
    });
});

router.post('/productsByCategory', function (req, res, next) {
    Product.find({ category: req.body.catName }, function (err, products) {
        var productsArr = [];
        productsArr = products;
        res.json(productsArr);
    });
});

router.get('/ProductsNumber', function (req, res, next) {
    Product.find({}, function (err, products) {
        res.json(products.length);
    });
});

router.post('/addProduct', function (req, res, next) {
    new Product(req.body).save()
        .then(result => res.json(result))
        .catch(error => {
            if (error)
                res.json({ hasError: error });
        });
});


router.put('/editProduct', function (req, res, next) {

    var id = req.body._id;
    Product.findByIdAndUpdate({ _id: id }, req.body, { new: true })
        .then(result => { res.json(result) })
        .catch(error => {
            if (error)
                res.json({ hasError: error });
        });
});

router.get('/search', function (req, res, next) {
    let query = req.query['query'];
    Product.find({ name: { $regex: `.*${query}.`, $options: "i" } }, function (err, products) {
        var productsFound = [];

        products.forEach(function (product) {
            productsFound.push(product);
        });

        if (productsFound.length > 0) {
            res.json(productsFound);
        } else {
            res.json({ msg: "No results" });
        }
    });
});

router.get('/dates', async function (req, res) {
    try {
        let orders = await Order.find({});
        let futureDates = [];
        if (orders.length > 0) {
            for (let i = 0; i < orders.length; i++) {
                const order = orders[i];
                futureDates.push(formatDateToArr(new Date(order.shippingDate)));
            };
        };
        res.json(futureDates);
    } catch (e) {
        res.json({ hasError: `Couldn't communicate with the server.` });
    };
})

function formatDateToArr(day) {
    let arr = [];
    arr.push(day.getFullYear());
    arr.push(day.getMonth() % 12 + 1);
    arr.push(day.getDate());
    return arr;
};


module.exports = router;
