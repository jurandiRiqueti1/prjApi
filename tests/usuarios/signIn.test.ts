import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Usuarios - SignIn', () => {

    beforeAll(async () => {
        await testServer
            .post('/cadastrar')
            .send({
                nome: 'Teste Teste',
                email: 'teste.teste@gmail.com',
                senha: '12345678',
            });                
    });

    it('Faz login', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste.teste@gmail.com',
                senha: '12345678',
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.OK);
        expect(res1.body).toHaveProperty('accessToken');
    });

    it('Senha errada', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste.teste@gmail.com',
                senha: '123456789',
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Email errado', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste.teste.errado@gmail.com',
                senha: '12345678',
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.UNAUTHORIZED);
        expect(res1.body).toHaveProperty('errors.default');
    });

    it('Email inválido', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste.teste',
                senha: '12345678',
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.email');
    });

    it('Senha curta', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste.teste@gmail.com',
                senha: '1234567',
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.senha');
    });

    it('Login sem senha', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                email: 'teste.teste@gmail.com',
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.senha');
    });

    it('Login sem email', async () => {
        
        const res1 = await testServer
            .post('/entrar')
            .send({
                senha: '12345678',
            });
            
        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.email');
    });

})