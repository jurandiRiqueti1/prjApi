import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middlewares';
import { pessoasProvider } from '../../database/providers/pessoas';

interface IQueryProps{
    page?: number;
    limit?: number;
    filter?: string;
};

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
}));

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {
    
    const page = req.query.page || 1;
    const limit = req.query.limit || 7;
    const filter = req.query.filter || '';

    const result = await pessoasProvider.getAll(page, limit, filter);
    const count = await pessoasProvider.count(filter);

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    } else if (count instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: count.message,
            }
        });
    };

    res.setHeader('access-control-expose-headers', 'x-total-count');
    res.setHeader('x-total-count', count);

    return res.status(StatusCodes.OK).json(result);
};