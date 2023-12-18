//import libs
import express from 'express';

import {cidadesController} from './../controllers'

const router = express.Router();

router.get('/', (req, res) => (
    res.status(200).end()
));

router.post("/cidades", cidadesController.create);

export { router };