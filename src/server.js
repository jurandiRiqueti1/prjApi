require('dotenv').config();
const cors = require('cors');
const express = require('express');
const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());

server.get("/:id", (req, res) => (
    res.status(200).json({
        id: req.params.id,
        mensagem: `Olá usuário ${req.params.id} seu login foi efetuado!`
    })
));

server.listen(port, () => (
    console.log(`Servidor rodando na porta ${port}`)
));