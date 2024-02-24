import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - UpdateById', () => {

    let token: string | undefined = undefined;

    beforeAll(async () => {

        const email = 'cidades-updatebyid@gmail.com'

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

    it('Atualiza registro', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .set({authorization: `Bearer ${token}`})
            .send({
                nome: 'Caxias do Sul'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resAtualizada = await testServer
            .put(`/cidades/${res1.body}`)
            .set({authorization: `Bearer ${token}`})
            .send({nome: 'Caxias'});
            
        expect(resAtualizada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta atualizar registro que não existe',async () => {
        
        const res1 = await testServer
            .put('/cidades/99999')
            .set({authorization: `Bearer ${token}`})
            .send({
                nome: 'Caxias'
            });

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })

});