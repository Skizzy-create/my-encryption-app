import { NextFunction, Request, Response } from "express";

const countRequest = (req: Request, res: Response, next: NextFunction): void => {
    count++;
    console.log("number of request :" + count);
    console.log("-----Resquest starts-----");
    next();
};

var count = 0;

const countTime = (req: Request, res: Response, next: NextFunction): void => {
    const start: number = new Date().getTime();
    next();
    const end: number = new Date().getTime();
    console.log(`TIme taken : ${end - start}ms `);
    console.log('----####Request Ends####----');
}

export { countRequest, countTime };

