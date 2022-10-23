exports.get404Page = (req,res)=>{
      res.status(404);
      res.render('error/404', { title: 'Page Not Found' } ); //  error/404.pug dosyası çalışır ve title dosyası burada ifade edilir
}