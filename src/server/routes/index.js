import express from 'express';
// import

const router = express.Router();

router.get('/', (req, res) => (
    res.json({
        status: 'on'
    })
));

router.get("/:id", (req, res) => (
    res.status().json({
        id: req.query,
        mensagem: `Olá usuário ${req.params.id} seu login foi efetuado!`
    })
));

export { router };