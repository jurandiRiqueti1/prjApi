//import libs
import 'dotenv/config';

//import do projeto
import { server } from './server/server.js'

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});