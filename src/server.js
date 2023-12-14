const express = require('express');
const server = express();
const port = 3000;

server.get("/teste/:id", (req, res) => (
    res.status(200).json({
        id: req.params.id,
        mensagem: `Olá usuário ${req.params.id} seu login foi efetuado!`
    })
));

server.listen(port, () => (
    console.log(`Servidor rodando na porta ${port}`)
));