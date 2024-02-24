import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - GetAll', () => {

    let token: string | undefined = undefined;

    beforeAll(async () => {

        const email = 'cidades-getall@gmail.com'

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

    it('Buscar todos os registros', async () => {

        // const res1 = await testServer
        //     .post('/cidades')
        //     .send({
        //         nome: 'Caxias do Sul'
        //     });
        
        // expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBusca = await testServer
            .get('/cidades')
            .set({authorization: `Bearer ${token}`})
            .send();

        expect(Number(resBusca.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBusca.statusCode).toEqual(StatusCodes.OK);
        expect(resBusca.body.length).toBeGreaterThan(0);
    });

});