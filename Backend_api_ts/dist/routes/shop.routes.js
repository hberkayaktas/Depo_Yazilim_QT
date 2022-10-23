"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const post_controller_1 = require("../controllers/post.controller");
const router = (0, express_1.Router)();
router.route('/')
    .get(post_controller_1.getIndex); //products sayfasından productları çağırırız
router.route('/products')
    .get(post_controller_1.getProducts);
// products/132
router.route('/product/:productid')
    .get(post_controller_1.getProduct);
/*
router.route('/:product')
    .get(getproduct)
    .delete(deleteproductt)
    .put(updateproduct);
*/
exports.default = router;
