import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";
import { ExecutableBase } from "mysql2/typings/mysql/lib/protocol/sequences/ExecutableBase";

describe('Pessoas - UpdateById', () => {

    let cidadeId: number | undefined = undefined;

    let token: string | undefined = undefined;

    beforeAll(async () => {

        const email = 'pessoas-updatebyid@gmail.com'

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
    
    it('Atualiza registro', async () => {
        
        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/pessoas/${res1.body}`)
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste da Silva',
                email: 'teste.teste.updated@gmail.com',
                cidadeId
            });
            
        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta atualizar registro que não existe',async () => {
        
        const res1 = await testServer
            .put('/pessoas/99999')
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste da Silva',
                email: 'teste.teste@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })

});