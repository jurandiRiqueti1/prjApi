import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - GetById', () => {

    it('Procura registro por id', async () => {
        
        const res1 = await testServer
            .post('/cidades')
            .send({
                nome: 'Caxias do Sul'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resProcurada = await testServer
            .get(`/cidades/${res1.body}`)
            .send();
            
        expect(resProcurada.statusCode).toEqual(StatusCodes.OK);
        expect(resProcurada.body).toHaveProperty('nome');
    });

    it('Tenta procurar registro que não existe',async () => {
        
        const res1 = await testServer
            .get('/cidades/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })

})