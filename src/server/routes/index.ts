//import libs
import express from 'express';

import {cidadesController, pessoasController, usuariosController} from './../controllers'
import { StatusCodes } from 'http-status-codes';
import { ensureAuthenticated } from '../shared/middlewares';

const router = express.Router();

router.get('/', (req, res) => (
    res.status(StatusCodes.OK).send(`NODE_ENV=${process.env.NODE_ENV}`)
));

//ROTAS CIDADES

//getAll
router.get('/cidades', ensureAuthenticated, cidadesController.getAllValidation, cidadesController.getAll);

//getById
router.get('/cidades/:id', ensureAuthenticated, cidadesController.getByIdValidation, cidadesController.getById);

//updateById
router.put('/cidades/:id', ensureAuthenticated, cidadesController.updateByIdValidation, cidadesController.updateById);

//create
router.post('/cidades', ensureAuthenticated, cidadesController.createValidation, cidadesController.create);

//deleteById
router.delete('/cidades/:id', ensureAuthenticated, cidadesController.deleteByIdValidation, cidadesController.deleteById)

//ROTAS PESSOAS

//getAll
router.get('/pessoas', ensureAuthenticated, pessoasController.getAllValidation, pessoasController.getAll);

//getById
router.get('/pessoas/:id', ensureAuthenticated, pessoasController.getByIdValidation, pessoasController.getById);

//updateById
router.put('/pessoas/:id', ensureAuthenticated, pessoasController.updateByIdValidation, pessoasController.updateById);

//create
router.post('/pessoas', ensureAuthenticated, pessoasController.createValidation, pessoasController.create);

//deleteById
router.delete('/pessoas/:id', ensureAuthenticated, pessoasController.deleteByIdValidation, pessoasController.deleteById);

//ROTAS USUARIOS

//signIn
router.post('/entrar', usuariosController.signInValidation, usuariosController.signIn);

//signUp
router.post('/cadastrar', usuariosController.signUpValidation, usuariosController.signUp);

export { router };