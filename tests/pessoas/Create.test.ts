import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - Create', () => {

    let cidadeId: number | undefined = undefined;
    let token: string | undefined = undefined;

    beforeAll(async () => {

        const email = 'pessoas-create@gmail.com'

        await testServer
            .post('/cadastrar')
            .send({
                nome: "Teste Teste",
                email: email,
                senha: '12345678'
            });

        const resSignIn = await testServer
            .post('/entrar')
            .send({
                email: email,
                senha: '12345678'
            });

        token = resSignIn.body.accessToken;

        const resCidade = await testServer
            .post('/cidades')
            .set({authorization: `Bearer ${token}`})
            .send({
                nome: 'cidadeTeste'
            });                

        cidadeId = resCidade.body;
    });

    it('Cria registro 1', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
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
            .set({authorization: `Bearer ${token}`})
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
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste.duplicado@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste Duplicado',
                email: 'teste.teste.duplicado@gmail.com',
                cidadeId
            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');

    });

    it('Tenta criar registro com nome curto', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'te',
                email: 'teste.teste@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.nomeCompleto');

    });

    it('Tenta criar registro com email inválido', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste.gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.email');
        
    });

    it('Tenta criar registro sem nomeCompleto', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({
                email: 'teste.teste@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.nomeCompleto');
        
    });

    it('Tenta criar registro sem email', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste Teste',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.email');
        
    });

    it('Tenta criar registro sem cidadeId', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste@gmail.com'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.cidadeId');
        
    });

    it('Tenta criar registro com cidadeId inválido', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste@gmail.com',
                cidadeId: 99999
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
        
    });

    it('Tenta criar registro sem nenhuma propriedade', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({ });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.nomeCompleto');
        expect(res1.body).toHaveProperty('errorsResult.body.cidadeId');
        expect(res1.body).toHaveProperty('errorsResult.body.email');

    });

});