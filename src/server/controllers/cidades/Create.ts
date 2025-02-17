import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middlewares';
import { ICidade } from '../../database/models';
import { cidadesProvider } from '../../database/providers/cidades';

interface IBodyPros extends Omit<ICidade, 'id'> {};

export const createValidation = validation((getSchema) => ({
    body: getSchema<IBodyPros>(yup.object().shape({
        nome: yup.string().required().min(3).max(150),
    })),
}));

export const create = async (req: Request<{},{},IBodyPros>, res: Response) => {
    
    const result = await cidadesProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
