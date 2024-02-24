import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - DeleteById', () => {

    let token: string | undefined = undefined;

    beforeAll(async () => {

        const email = 'cidades-deletebyid@gmail.com'

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

    it('Deleta registro por id', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .set({authorization: `Bearer ${token}`})
            .send({
                nome: 'Caxias do Sul'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .set({authorization: `Bearer ${token}`})
            .send();
            
        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta deletar registro que não existe',async () => {
        
        const res1 = await testServer
            .delete('/cidades/99999')
            .set({authorization: `Bearer ${token}`})
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })

    it('Tenta enviar uma request sem o id', async () => {

        const res1 = await testServer
            .delete('/cidades/caxias')
            .set({authorization: `Bearer ${token}`})
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    })

});