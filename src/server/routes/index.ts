//import libs
import express from 'express';

import {cidadesController} from './../controllers'

const router = express.Router();

router.get('/', (req, res) => (
    res.status(200).send(`NODE_ENV=${process.env.NODE_ENV}`)
));

//ROTAS CIDADES

//getAll
router.get('/cidades', cidadesController.getAllValidation, cidadesController.getAll);

//getById
router.get('/cidades/:id', cidadesController.getByIdValidation, cidadesController.getById);

//updateById
router.put('/cidades/:id', cidadesController.updateByIdValidation, cidadesController.updateById);

//create
router.post('/cidades', cidadesController.createValidation, cidadesController.create);

//deleteById
router.delete('/cidades/:id', cidadesController.deleteByIdValidation, cidadesController.deleteById)

export { router };