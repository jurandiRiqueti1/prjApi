import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - DeleteById', () => {

    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({
                nome: 'cidadeTeste'
            });                
        
        cidadeId = resCidade.body;
    });

    it('Deleta registro por id', async () => {
        
        const res1 = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/pessoas/${res1.body}`)
            .send();
            
        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta deletar registro que não existe',async () => {
        
        const res1 = await testServer
            .delete('/pessoas/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })

    it('Tenta enviar uma request sem o id', async () => {

        const res1 = await testServer
            .delete('/pessoas/teste')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    })

});