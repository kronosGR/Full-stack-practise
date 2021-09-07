const express = require("express");
const path = require("path");

const shopController = require("../controllers/shop");

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', shopController.getGetCart);
router.post('/cart', shopController.postCart);

router.get('/orders', shopController.getGetOrders);

router.get('/checkout', shopController.getCheckout);

module.exports = router;