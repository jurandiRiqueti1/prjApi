import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middlewares';
import { IUsuario } from '../../database/models';
import { usuariosProvider } from '../../database/providers/usuarios';

interface IBodyPros extends Omit<IUsuario, 'id' | 'nome'> {};

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyPros>(yup.object().shape({
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(8),
    })),
}));

export const signIn = async (req: Request<{},{},IBodyPros>, res: Response) => {
    
    const {email, senha} = req.body;

    const result = await usuariosProvider.getByEmail(email);

    if (result instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            }
        });
    }

    if (senha !== result.senha) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            }
        });
    } else {
        return res.status(StatusCodes.OK).json({ accessToken: 'teste' });
    }
};
