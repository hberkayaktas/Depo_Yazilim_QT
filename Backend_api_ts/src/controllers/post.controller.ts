import { Request, Response } from 'express'

// DB
import { connect } from '../database'
// Interfaces
import { ProductTypes } from '../interface/ProductTypes'

export async function getProducts(req: Request, res: Response): Promise<Response | void> {
    try {
        const page  = req.query.page || 1; //sayfa isteği yapılırsa
        const productPerPage = "10"; //her sayfada kaç adet gösteriecek
        let offset:number | string   = 0;
        if(page != 1){
            offset = ((Number(page)-1)*Number(productPerPage)).toString();
        }else{
            offset = offset.toString();
        }
        console.log(offset,productPerPage);
        const conn = await connect();
        const products = await conn.query('SELECT * FROM products LIMIT '+productPerPage+' OFFSET '+ offset); //veritabanından çağırma
        res.setHeader("Content-Type", "application/json");
        res.setHeader('Accept', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        
        res.status(200).end(JSON.stringify({products: products[0]}));
    }
    catch (e) {
        console.log(e)
    }
}

export async function getIndex(req: Request, res: Response) {
 
}

export async function getProduct(req: Request, res: Response) {
    try {
        const id  = req.params.productid; //sayfa isteği yapılırsa
        
        const conn = await connect();
        const products:any = await conn.query('SELECT * FROM products WHERE products.id='+ id); //veritabanından çağırma
        res.setHeader("Content-Type", "application/json");
        res.setHeader('Accept', 'application/json');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Credentials', 'true');
        
        res.status(200).end(JSON.stringify({product: products[0][0]}));
    }
    catch (e) {
        console.log(e)
    }
}
