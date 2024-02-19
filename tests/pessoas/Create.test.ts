import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - Create', () => {

    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({
                nome: 'cidadeTeste'
            });                
        
        cidadeId = resCidade.body;
    });

    it('Cria registro 1', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Teste Teste 1',
                email: 'teste.teste@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

    });

    it('Cria registro 2', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Teste Teste 2',
                email: 'teste.teste.2@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

    });

    it('Tenta criar registro com email duplicado', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste.duplicado@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Teste Duplicado',
                email: 'teste.teste.duplicado@gmail.com',
                cidadeId
            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');

    });

    it('Não pode conter valores nulos/vazios', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({
                nome: null
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.nome')

    });

});