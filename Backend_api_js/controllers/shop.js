const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req,res,next) =>{
      //const products = Product.getAll();
      const categories = Category.getAll();

      Product.getAll()
            .then(products =>{
                  res.render('shop/index',{ 
                        title: 'Shopping' , 
                        products: products[0] ,
                        categories: categories,
                        path: '/'
                  });
            })
            .catch((err)=>{
                  console.log(err);
            });
      
}


exports.getProducts = async (req,res,next) =>{
      const ProductCount = await Product.getTotalCount();
      console.log(ProductCount[0][0]['COUNT(*)']);
      const totalProduct = ProductCount[0][0]['COUNT(*)'];

      const page = req.query.page || 1; //sayfa isteği yapılırsa
      const productPerPage = "10"; //her sayfada kaç adet gösteriecek
      let offset = 0;
      if(page != "1"){
            offset = ((page-1)*Number(productPerPage)).toString();
      }else{
            offset = offset.toString();
      }
      console.log(offset,productPerPage);

      Product.getAll(productPerPage,offset)
      .then(products =>{
            /*res.render('shop/products',{ 
                  title: 'Products' , 
                  products: products[0] ,
                  categories: categories,
                  path: '/'
            });*/
            res.setHeader("Content-Type", "application/json");
            res.setHeader('Accept', 'application/json');
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            
            res.status(200).end(JSON.stringify({products: products[0]}));
      })
      .catch((err)=>{
            console.log(err);
      });
     
}
exports.getProductsByCategoryId = (req,res,next) =>{
      const categoryid = req.params.categoryid;
      const products = Product.getProductsByCategoryId(categoryid);
      const categories = Category.getAll();
      res.render('shop/products',
      { 
           title: 'Products' , 
           products: products ,
           categories: categories,
           selectedCategory: categoryid,
           path: '/products'
      });
}


exports.getProduct = (req,res,next) =>{
      Product.getById(req.params.productid)
            .then((product)=>{
                /*  res.render('shop/product-detail', { 
                  title: product[0][0].name,
                  product : product[0][0],
                  path : '/products' 
                  }); */

                  res.setHeader("Content-Type", "application/json");
                  res.setHeader('Accept', 'application/json');
                  res.setHeader('Access-Control-Allow-Origin', '*');
                  res.setHeader('Access-Control-Allow-Credentials', 'true');
                  
                  res.status(200).end(JSON.stringify({product: product[0][0]}));
            })
            .catch((err)=>{
                  console.log(err);
            });
}


exports.getCart = (req,res,next) =>{
      res.render('shop/cart',
      { 
           title: 'Cart' , 
           path: '/cart'
      });
}
exports.getOrders = (req,res,next) =>{
      res.render('shop/orders',
      { 
           title: 'Orders' , 
           path: '/orders'
      });
}