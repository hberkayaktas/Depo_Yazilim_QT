const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors')

const bodyParser=  require('body-parser'); //bütün gelen verilerin parçalar halinde elealınması


const connection =  require('./utility/database'); //database bağlantısı

const adminRoutes = require('./routes/admin');  // admin bağlantıları "yönlendirici kök dizini"
const userRoutes = require('./routes/shop'); // ürün bağlantıları "yönlendirici kök dizini"

app.use(bodyParser.urlencoded({extended:false})); //butün yollanan verileri parçalarız
app.use(express.static(path.join( __dirname, 'public')));//statik dosyaların dahil edilmesi
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
//app başlaması için npm start demek yeterli
//script sayfasına nodemon ve server tanımlaması yapıldı.

app.set('view engine','pug'); //pug template-engine 'in görüntü motorunu dahil ettik
app.set('views','./views'); //şablonların views klasöründe olduğunu söyledik



//Routes
app.use('/admin', adminRoutes); //admin bağlantılarının ön eki localhost/admin/add-product şeklinde olmasını tanımlarız 
app.use(userRoutes); // kullanıcı için yollarda herhangibir eklenti sunmayız

/*  Düz sorgu yapma
connection.execute('SELECT * FROM products')
      .then((result) => {
            console.log(result);
      }).catch((err)=>{
            console.log(err)
      })
*/


const errorController = require('./controllers/errors'); //hata sayfalarımız "İstek Çağırma kök dizini"


app.use(errorController.get404Page); //hatalı sayfada hata sayfamızı çağır





app.listen(5000, ()=>{
      console.log('server start on 5000 port');
});

//nodemon kurduk
//npm install nodemon -g