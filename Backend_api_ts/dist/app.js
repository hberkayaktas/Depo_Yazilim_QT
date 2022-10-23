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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
//import cors from 'cors'
const body_parser_1 = __importDefault(require("body-parser"));
// Routes
//import IndexRoutes from './routes/index.routes'
//import PostRoutes from './routes/post.routes'
const admin_routes_1 = __importDefault(require("./routes/admin.routes"));
const shop_routes_1 = __importDefault(require("./routes/shop.routes"));
class App {
    constructor(port) {
        this.port = port;
        this.app = (0, express_1.default)();
        this.settings();
        this.middlewares();
        this.routes();
    }
    settings() {
        this.app.set('port', this.port || process.env.PORT || 3000);
    }
    middlewares() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use(express_1.default.json());
        this.app.use(body_parser_1.default.urlencoded({ extended: false })); //butün yollanan verileri parçalarız
        this.app.use(express_1.default.static(path_1.default.join(__dirname, 'public'))); //statik dosyaların dahil edilmesi
        this.app.use(express_1.default.static("public"));
        this.app.use(express_1.default.urlencoded({ extended: true }));
        this.app.use(express_1.default.json());
        //this.app.use(cors());
    }
    routes() {
        this.app.use('/admin', admin_routes_1.default); //admin bağlantılarının ön eki localhost/admin/add-product şeklinde olmasını tanımlarız 
        this.app.use(shop_routes_1.default); // kullanıcı için yollarda herhangibir eklenti sunmayız
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.app.listen(this.app.get('port'));
            console.log('Server on port', this.app.get('port'));
        });
    }
}
exports.App = App;
