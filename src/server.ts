import { createServer, Server } from "http";
import { productRout } from "./routes/product.route";

const server: Server = createServer((req, res) => {
    productRout(req, res)
})

server.listen(5000, ()=>{
    console.log(`Server is running http://localhost:5000`)
})