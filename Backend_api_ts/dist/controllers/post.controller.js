"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProduct = exports.getIndex = exports.getProducts = void 0;
// DB
const database_1 = require("../database");
function getProducts(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const page = req.query.page || 1; //sayfa isteği yapılırsa
            const productPerPage = "10"; //her sayfada kaç adet gösteriecek
            let offset = 0;
            if (page != 1) {
                offset = ((Number(page) - 1) * Number(productPerPage)).toString();
            }
            else {
                offset = offset.toString();
            }
            console.log(offset, productPerPage);
            const conn = yield (0, database_1.connect)();
            const products = yield conn.query('SELECT * FROM products LIMIT ' + productPerPage + ' OFFSET ' + offset); //veritabanından çağırma
            res.setHeader("Content-Type", "application/json");
            res.setHeader('Accept', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.status(200).end(JSON.stringify({ products: products[0] }));
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getProducts = getProducts;
function getIndex(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        /* const newPost: Post = req.body;
         const conn = await connect();
         await conn.query('INSERT INTO posts SET ?', [newPost]);
         res.json({
             message: 'New Post Created'
         });*/
    });
}
exports.getIndex = getIndex;
function getProduct(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const id = req.params.productid; //sayfa isteği yapılırsa
            const conn = yield (0, database_1.connect)();
            const products = yield conn.query('SELECT * FROM products WHERE products.id=' + id); //veritabanından çağırma
            res.setHeader("Content-Type", "application/json");
            res.setHeader('Accept', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            res.status(200).end(JSON.stringify({ product: products[0][0] }));
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getProduct = getProduct;
