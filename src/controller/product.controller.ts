import { IncomingMessage, ServerResponse } from "http";
import { readProduct } from "../services/product.service";

export const productController = (
  req: IncomingMessage,
  res: ServerResponse
) => {
     const url = req.url
     const method = req.method

     const urlPart = url?.split('/')  // '/products/151' => ['', 'products', '232']
     const id = urlPart && urlPart[1] === 'products' ? Number(urlPart[2]) : null;


     console.log(id)

     if(method === 'GET' && url === '/products'){
        const products =  readProduct()
        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify({message:'Eita Product route', data : products}))
    } else if (method === 'GET' && id !== null){
       const products =  readProduct()
        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify({message:'Eita Product route', data : products}))
    }
    // else {
        // res.writeHead(200, {'content-type' : 'application/json'})
        // res.end(JSON.stringify({message:'bhai eikhane kono kichu nai'}))
    // }
};

// productController()
