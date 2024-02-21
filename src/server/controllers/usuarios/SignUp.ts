import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middlewares';
import { IUsuario } from '../../database/models';
import { usuariosProvider } from '../../database/providers/usuarios';

interface IBodyPros extends Omit<IUsuario, 'id'> {};

export const signUpValidation = validation((getSchema) => ({
    body: getSchema<IBodyPros>(yup.object().shape({
        nome: yup.string().required().min(3),
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(8),
    })),
}));

export const signUp = async (req: Request<{},{},IBodyPros>, res: Response) => {
    
    const result = await usuariosProvider.create(req.body);

    if (result instanceof Error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: {
                default: result.message,
            }
        });
    }

    return res.status(StatusCodes.CREATED).json(result);
};
