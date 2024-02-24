import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - GetById', () => {

    let cidadeId: number | undefined = undefined;

    let token: string | undefined = undefined;

    beforeAll(async () => {

        const email = 'pessoas-getbyid@gmail.com'

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

    it('Procura registro por id', async () => {
        
        const res1 = await testServer
            .post('/pessoas')
            .set({authorization: `Bearer ${token}`})
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resProcurada = await testServer
            .get(`/pessoas/${res1.body}`)
            .set({authorization: `Bearer ${token}`})
            .send();
            
        expect(resProcurada.statusCode).toEqual(StatusCodes.OK);
        expect(resProcurada.body).toHaveProperty('nomeCompleto');
    });

    it('Tenta procurar registro que não existe',async () => {
        
        const res1 = await testServer
            .get('/pessoas/99999')
            .set({authorization: `Bearer ${token}`})
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })

})