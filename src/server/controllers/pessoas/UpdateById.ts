import { Request, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middlewares';
import { IPessoa } from '../../database/models';
import { pessoasProvider } from '../../database/providers/pessoas';

interface IParamProps{
    id?: number;
}

interface IBodyProps extends Omit<IPessoa, 'id'>{};

export const updateByIdValidation = validation((getSchema) => ({
    params: getSchema<IParamProps>(yup.object().shape({
        id: yup.number().integer().required().moreThan(0),
    })),
    body: getSchema<IBodyProps>(yup.object().shape({
        email: yup.string().required().email(),
        cidadeId: yup.number().integer().required(),
        nomeCompleto: yup.string().required().min(3),
    })),
}));

export const updateById = async (req: Request<IParamProps,{}, IBodyProps>, res: Response) => {
    
    if(!req.params.id) {
        return res.status(StatusCodes.BAD_REQUEST).json({
            errors: {
                default: 'o parâmetro "id" precisa ser informado.'
            }
        });
    }

    const result = await pessoasProvider.updateById(req.params.id, req.body)

    if(result instanceof Error){
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.NO_CONTENT).json(result);
};