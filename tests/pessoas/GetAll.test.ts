import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - GetAll', () => {

    let cidadeId: number | undefined = undefined;

    let token: string | undefined = undefined;

    beforeAll(async () => {

        const email = 'pessoas-getall@gmail.com'

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

    it('Buscar todos os registros', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste@gmail.com',
                cidadeId
            });
        
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBusca = await testServer
            .get('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send();

        expect(Number(resBusca.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBusca.statusCode).toEqual(StatusCodes.OK);
        expect(resBusca.body.length).toBeGreaterThan(0);
    });

});