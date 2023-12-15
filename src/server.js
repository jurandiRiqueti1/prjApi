require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());

const connection = mysql.createConnection({
    host: '192.168.3.13',
    user: 'root',
    password: 'mysqltest'
});

connection.connect((err) => {
    if(err){
        console.error('Erro de conexão: ', err);
    }else{
        console.log('Conexão estabelecida!');
    }
});

connection.query('CREATE DATABASE teste_banco', (err) => {
    if (err) {
       console.error('Erro ao criar o banco de dados', err); 
    }else{
        console.log('Banco de dados criado!')
    }
});

server.get("/:id", (req, res) => (
    res.status(200).json({
        id: req.params.id,
        mensagem: `Olá usuário ${req.params.id} seu login foi efetuado!`
    })
));

server.listen(port, () => (
    console.log(`Servidor rodando na porta ${port}`)
));