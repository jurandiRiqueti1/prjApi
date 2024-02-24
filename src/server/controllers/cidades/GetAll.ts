import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middlewares';
import { cidadesProvider } from '../../database/providers/cidades';

interface IQueryProps{
    id?: number;
    page?: number;
    limit?: number;
    filter?: string;
};

export const getAllValidation = validation((getSchema) => ({
    query: getSchema<IQueryProps>(yup.object().shape({
        id: yup.number().integer().optional().default(0),
        page: yup.number().optional().moreThan(0),
        limit: yup.number().optional().moreThan(0),
        filter: yup.string().optional(),
    })),
}));

export const getAll = async (req: Request<{},{},{}, IQueryProps>, res: Response) => {
    
    const page = req.query.page || 1;
    const limit = req.query.limit || 7;
    const filter = req.query.filter || '';
    const id =  Number(req.query.id || 0);

    const result = await cidadesProvider.getAll(page, limit, filter, id);
    const count = await cidadesProvider.count(filter);

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