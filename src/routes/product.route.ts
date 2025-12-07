import { IncomingMessage, ServerResponse } from "http";


export const productRout = (req: IncomingMessage, res:ServerResponse) => {
    const url = req.url
    const method = req.method

    if(method === 'GET' && url === '/'){
        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify({message:'Eita root url'}))
    } else if(url?.startsWith('/products')){

    } else {
        res.writeHead(200, {'content-type' : 'application/json'})
        res.end(JSON.stringify({message:'bhai eikhane kono kichu nai'}))
    }
}