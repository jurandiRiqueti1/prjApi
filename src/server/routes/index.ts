//import libs
import express from 'express';

const router = express.Router();

router.get('/', (req, res) => (
    res.status(200).end()
));

router.get("/:id", (req, res) => (
    res.status(200).json({
        id: req.params.id,
        mensagem: `Olá usuário ${req.params.id} seu login foi efetuado!`
    })
));

export { router };