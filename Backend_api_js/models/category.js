/*const categories =[
    {id: "1", name: "Kahve", description: "Kahve kategori ürünleri"},
    {id: "2", name: "Çay", description: "Çay kategori ürünleri"},
    {id: "3", name: "Beyaz Çay", description: "Beyaz Çay kategori ürünleri"},
]*/

//data base bağlantısı çağırma
const connection =  require('../utility/database');


module.exports = class Category {
      constructor(name, description) {
            this.id (categories.length+1).toString(); 
            this.name = name; 
            this.description = description; 
      }

      saveCategory() {
            //categories.push(this);
            return connection.execute('INSERT INTO categories(name,description) VALUES(?,?)',[this.name,this.description]);
      }
      static getAll() {
            //return categories;
            return connection.execute('SELECT * FROM categories');

      }

      static getById(id) {
            //return categories.find(i=>i.id===id);
            return connection.execute('SELECT * FROM categories WHERE id=?',[id]);
      }

      static update(category) {
            //const index = categories.findIndex(i=>i.id === category.id);
            //categories[index].name = category.name;
            //categories[index].description = category.description; 
            return connection.execute('UPDATE categories SET categories.name=?,categories.description=?',[category.name,category.description]);
      }

      static deleteById(id) {
            //const index = categories.findIndex(i=> i.id === id); 
            //categories.splice(index,1);
            return connection.execute('DELETE FROM categories WHERE id=?',[id]);
      }

}