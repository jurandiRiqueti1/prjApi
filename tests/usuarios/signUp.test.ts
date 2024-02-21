import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Usuarios - SignUp', () => {

    it('Cria registro 1', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Teste Teste',
                email: 'teste.teste@gmail.com',
                senha: '12345678',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

    });

    it('Cria registro 2', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Teste Teste 2',
                email: 'teste.teste.2@gmail.com',
                senha: 'abcdefgh',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

    });

    it('Tenta criar registro com email duplicado', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Teste Teste',
                email: 'teste.teste.duplicado@gmail.com',
                senha: '12345678',
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

        const res2 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Teste Teste',
                email: 'teste.teste.duplicado@gmail.com',
                senha: '12345678',
            });

        expect(res2.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res2.body).toHaveProperty('errors.default');

    });

    it('Tenta criar registro com nome curto', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Te',
                email: 'teste.teste@gmail.com',
                senha: '12345678',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.nome');

    });

    it('Tenta criar registro com email inválido', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Teste Teste',
                email: 'teste.teste',
                senha: '12345678',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.email');
        
    });

    it('Tenta criar registro sem nome', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({
                email: 'teste.teste@gmail.com',
                senha: '12345678',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.nome');
        
    });

    it('Tenta criar registro sem email', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Teste Teste',
                senha: '12345678',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.email');
        
    });

    it('Tenta criar registro sem senha', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Teste Teste',
                email: 'teste.teste@gmail.com'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.senha');
        
    });

    it('Tenta criar registro com senha curta', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({
                nome: 'Teste Teste',
                email: 'teste.teste@gmail.com',
                senha: '1234567',
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.senha');
        
    });

    it('Tenta criar registro sem nenhuma propriedade', async () => {

        const res1 = await testServer
            .post('/cadastrar')
            .send({ });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.nome');
        expect(res1.body).toHaveProperty('errorsResult.body.email');
        expect(res1.body).toHaveProperty('errorsResult.body.senha');

    });

});