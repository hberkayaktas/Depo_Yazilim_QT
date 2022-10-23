import { Router } from 'express'
import { getIndex, getProducts, getProduct } from '../controllers/post.controller'

const router = Router();

router.route('/')
      .get(getIndex); //products sayfasından productları çağırırız

router.route('/products')
      .get(getProducts); 


// products/132
router.route('/product/:productid')
      .get(getProduct);

/* 
router.route('/:product')
    .get(getproduct)
    .delete(deleteproductt)
    .put(updateproduct);
*/

export default router;