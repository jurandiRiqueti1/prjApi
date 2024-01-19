import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - DeleteById', () => {

    it('Deleta registro por id', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .send({
                nome: 'Caxias do Sul'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resApagada = await testServer
            .delete(`/cidades/${res1.body}`)
            .send();
            
        expect(resApagada.statusCode).toEqual(StatusCodes.NO_CONTENT);
    });

    it('Tenta deletar registro que não existe',async () => {
        
        const res1 = await testServer
            .delete('/cidades/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })

    it('Tenta enviar uma request sem o id', async () => {

        const res1 = await testServer
            .delete('/cidades/caxias')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    })

});