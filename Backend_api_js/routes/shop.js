const express = require('express');

const router = express.Router();

const shopController = require('../controllers/shop'); 


router.get('/', shopController.getIndex); //products sayfasından productları çağırırız
router.get('/products', shopController.getProducts); 


// products/delete
router.get('/products/delete', shopController.getProduct);
// products/update
router.get('/products/update', shopController.getProduct);

// products/132
router.get('/product/:productid', shopController.getProduct);
router.get('/categories/:categoryid', shopController.getProductsByCategoryId);

//router.get('/details', shopController.getProductDetails); 
router.get('/cart', shopController.getCart); 
router.get('/orders', shopController.getOrders); 

module.exports = router;