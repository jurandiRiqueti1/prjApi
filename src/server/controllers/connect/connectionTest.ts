import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export const connectionTest = (req: Request, res: Response) => (
    res.status(StatusCodes.OK).json({
        ip: req.ip
    }).end()
);