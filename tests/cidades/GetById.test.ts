import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - GetById', () => {

    let token: string | undefined = undefined;

    beforeAll(async () => {

        const email = 'cidades-getbyid@gmail.com'

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
    });

    it('Procura registro por id', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .set({authorization: `Bearer ${token}`})
            .send({
                nome: 'Caxias do Sul'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resProcurada = await testServer
            .get(`/cidades/${res1.body}`)
            .set({authorization: `Bearer ${token}`})
            .send();
            
        expect(resProcurada.statusCode).toEqual(StatusCodes.OK);
        expect(resProcurada.body).toHaveProperty('nome');
    });

    it('Tenta procurar registro que não existe',async () => {
        
        const res1 = await testServer
            .get('/cidades/99999')
            .set({authorization: `Bearer ${token}`})
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })

})