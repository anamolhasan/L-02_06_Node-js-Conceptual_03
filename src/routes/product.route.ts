import { IncomingMessage, ServerResponse } from "http";
import { productController } from "../controller/product.controller";


export const productRout = (req: IncomingMessage, res:ServerResponse) => {
    const url = req.url
    const method = req.method

    if(method === 'GET' && url === '/'){
        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify({message:'Eita root url'}))
    } else if(url?.startsWith('/products')){
        productController(req, res)
    } else {
        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify({message:'bhai eikhane kono kichu nai'}))
    }
}