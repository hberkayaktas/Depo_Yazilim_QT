const express = require('express');
const router = express.Router();


//const path = require('path');
const adminController = require('../controllers/admin'); 


//midle ware arasonda geçiş yapmak için next kullanılır
//next(); //next fonk ile diğer middle ware e geçiş sağlandı

//routing sıralamasına dikkat et yoksa sürekli ana sayfa sürekli ekrana gelir
//her sorguda ekrana gelmesini istediğin sayfa var ise örneğin log işlemi gibi 


// /admin/add-product=> POST
router.post('/add-product', adminController.postAddProduct);
// /admin/add-product=> GET
router.get('/add-product', adminController.getAddProduct);


router.get('/products/:productid', adminController.getEditProduct);
router.post('/products', adminController.postEditProduct);

router.get('/products', adminController.getProducts);

router.post('/delete-product', adminController.postDeleteProduct);


module.exports = router;
