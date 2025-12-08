import { IncomingMessage, ServerResponse } from "http";
import { readProduct, writeProduct } from "../services/product.service";
import { IProduct } from "../type/product.interface";
import { parseBody } from "../utility/parseBody";
import { sendResponse } from "../utility/sendResponse";

export const productController = async (
  req: IncomingMessage,
  res: ServerResponse
) => {
  const url = req.url;
  const method = req.method;

  const urlPart = url?.split("/"); // '/products/151' => ['', 'products', '232']
  const id = urlPart && urlPart[1] === "products" ? Number(urlPart[2]) : null;

  console.log(id);

  if (method === "GET" && url === "/products") {
    try {
      const products = readProduct();
      return sendResponse(
        res,
        true,
        200,
        "Products retrived successfully!",
        products
      );
    } catch (error) {
      return sendResponse(res, false, 400, "Something went wrong!!", error);
    }
  } else if (method === "GET" && id !== null) {
    const products = readProduct();
    const product = products.find((p: IProduct) => p.id === id);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Eita Product route", data: product }));
    return;
  } else if (method === "POST" && url === "/products") {
    const body = await parseBody(req);
    const products = readProduct();

    const newProduct = {
      id: Date.now(),
      ...body,
    };
    products.push(newProduct);
    writeProduct(products);
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify({ message: "Eita Product route", data: products }));
    return;
  } else if (method === "PUT" && id !== null) {
    const body = await parseBody(req);
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      res.writeHead(201, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not Found!",
        })
      );
      return;
    }
    products[index] = { id: products[index].id, ...body };
    writeProduct(products);
    res.writeHead(201, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Product update successfully!",
        data: products[index],
      })
    );
    return;
  } else if (method === "DELETE" && id !== null) {
    const products = readProduct();

    const index = products.findIndex((p: IProduct) => p.id === id);
    if (index < 0) {
      res.writeHead(201, { "content-type": "application/json" });
      res.end(
        JSON.stringify({
          message: "Product not Found!",
        })
      );
      return;
    }

    products.splice(index, 1);
    writeProduct(products);

    res.writeHead(200, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        message: "Products deleted successfully!",
      })
    );
    return;
    // else {
    // res.writeHead(200, {'content-type' : 'application/json'})
    // res.end(JSON.stringify({message:'bhai eikhane kono kichu nai'}))
    // }
  }
};
// productController()
