//import do projeto
import { server } from './server/server'

const port = process.env.PORT || 3000;

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});