
/*  Elle veri girme
const products = [
      { id:'13213', name: 'Espresso', price: '25', imageUrl: 'coffee1.jpg',description: 'tatlı mı tatlı' , categoryid:'1' },
      { id:'13325', name: 'Türk Kahvesi', price: '30', imageUrl: 'coffee2.jpg',description: 'şeker mi şeker' , categoryid:'1' },
      { id:'12252', name: 'Çay', price: '40', imageUrl: 'coffee3.jpg',description: 'Ballı mı Ballı' , categoryid:'2' },
      { id:'12252', name: 'Beyaz Çay', price: '60', imageUrl: 'coffee4.jpg',description: 'Şurup mu şurup' , categoryid:'3' }
];
*/

//data base bağlantısı çağırma
const connection =  require('../utility/database');

module.exports = class Product{

      constructor(name, price, imageUrl, description, categoryid){
           // this.id = (Math.floor(Math.random()*99999)+1).toString();
            this.name = name;
            this.price = price;
            this.imageUrl = imageUrl;
            this.description = description;
            this.categoryid = categoryid;
      }
      saveProduct(){
            //products.push(this);
            return connection.execute('INSERT INTO products (name, price, imageUrl, description, categoryid) VALUES (?, ?, ?, ?, ?)',[this.name, this.price, this.imageUrl, this.description,this.categoryid]);
      }

      static getAll(productPerPage,offset){
            //return products;
            return connection.execute('SELECT * FROM products LIMIT ? OFFSET ?',[productPerPage,offset]); //veritabanından çağırma
      }

      static getById(id){
            //return products.find(i=>i.id === id);   // yerel veriden çağırma
            return connection.execute('SELECT * FROM products WHERE products.id=?', [id]);
            // soru işareti bir şablondur ve içerisine köşeli parantezdeki item gelir
            
      }
      static getProductsByCategoryId(categoryid) {
            //return products.filter(i=> i.categoryid == categoryid); 
      }

      static Update(product) {
          /*const index = products.findIndex(i => i.id === product.id); 
            products[index].name = product.name;
            products[index].price = product.price;
            products[index].imageUrl = product.imageUrl;
            products[index].description = product.description;
            products[index].categoryid = product.categoryid;*/

            return connection.execute('UPDATE products SET products.name=?, products.price=?,products.imageUrl=?,products.description=?,products.categoryid=? WHERE products.id=?', [product.name, product.price, product.imageUrl, product.description, product.categoryid, product.id]);
      }

      static DeleteById(id) {
            //const index = products.findIndex(i => i.id === id); 
            //products.splice(index, 1);
            return connection.execute('DELETE FROM products WHERE id=?',[id]);

      }
      
      static getTotalCount(){
            //return products;
            return connection.execute('SELECT COUNT(*) FROM products'); //veritabanından çağırma
      }

}