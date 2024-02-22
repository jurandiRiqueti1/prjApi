import { Request, RequestHandler, Response } from 'express';
import * as yup from 'yup';
import { StatusCodes } from 'http-status-codes';

import { validation } from '../../shared/middlewares';
import { IUsuario } from '../../database/models';
import { usuariosProvider } from '../../database/providers/usuarios';
import { JWTService, PasswordCrypto } from '../../shared/services';

interface IBodyPros extends Omit<IUsuario, 'id' | 'nome'> {};

export const signInValidation = validation((getSchema) => ({
    body: getSchema<IBodyPros>(yup.object().shape({
        email: yup.string().required().email().min(5),
        senha: yup.string().required().min(8),
    })),
}));

export const signIn = async (req: Request<{},{},IBodyPros>, res: Response) => {
    
    const {email, senha} = req.body;

    const usuario = await usuariosProvider.getByEmail(email);

    if (usuario instanceof Error) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            }
        });
    }

    const passwordMatch = await PasswordCrypto.verifyPassword(senha, usuario.senha);

    if (!passwordMatch) {
        return res.status(StatusCodes.UNAUTHORIZED).json({
            errors: {
                default: 'Email ou senha inválidos',
            }
        });
    } else {

        const accessToken = JWTService.sign({uid: usuario.id});

        if(accessToken === 'JWT_SECRET_NOT_FOUND'){
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                errors: {
                    default: 'Erro ao gerar o token de acesso',
                }
            });
        }

        return res.status(StatusCodes.OK).json({ accessToken });
    }
};
