
import { IncomingMessage } from "http";

export const parseBody = (req: IncomingMessage): Promise<any> => {
    return new Promise((resole, rejected) => {
        let body = "";
        req.on('data', (chunk) => {
            body += chunk
        })
        req.on('end', () => {
            try{
                resole(JSON.parse(body))
            } catch(error) {
               rejected(error)
            };
            
        })
    })
};
