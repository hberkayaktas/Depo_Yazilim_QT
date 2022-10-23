import express, { Application } from 'express'
import morgan from 'morgan'
import path from 'path'
//import cors from 'cors'
import bodyParser from 'body-parser'

// Routes

import adminRoutes from './routes/admin.routes'
import userRoutes from './routes/shop.routes'

export class App {
    app: Application;

    constructor(
        private port?: number | string
    ) {
        this.app = express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    private settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }

    private middlewares() {
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(bodyParser.urlencoded({extended:false})); //butün yollanan verileri parçalarız
        this.app.use(express.static(path.join( __dirname, 'public')));//statik dosyaların dahil edilmesi
        this.app.use(express.static("public"));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        //this.app.use(cors());
    }

    private routes() {
        this.app.use('/admin', adminRoutes); //admin bağlantılarının ön eki localhost/admin/add-product şeklinde olmasını tanımlarız 
        this.app.use(userRoutes); // kullanıcı için yollarda herhangibir eklenti sunmayız
    }

    async listen(): Promise<void> {
        await this.app.listen(this.app.get('port'));
        console.log('Server on port', this.app.get('port'));
    }

}