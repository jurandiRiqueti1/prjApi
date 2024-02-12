//import do projeto
import { Knex } from './server/database/knex';
import { server } from './server/server'

const port = process.env.PORT || 3000;

const startServer = () => {
    server.listen(port, () => {
        console.log(`Servidor rodando na porta ${port}`);
    });
}

if(process.env.IS_LOCALHOST !== 'true'){
    Knex.migrate
        .latest()
        .then(() => {
            Knex.seed.run()
                .then(startServer)
                .catch(console.log);
        })
        .catch(console.log);
} else {
    startServer();
}
