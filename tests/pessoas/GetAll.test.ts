import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - GetAll', () => {

    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({
                nome: 'cidadeTeste'
            });                
        
        cidadeId = resCidade.body;
    });

    it('Buscar todos os registros', async () => {

        const res1 = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste@gmail.com',
                cidadeId
            });
        
        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resBusca = await testServer
            .get('/pessoas')
            .send();

        expect(Number(resBusca.header['x-total-count'])).toBeGreaterThan(0);
        expect(resBusca.statusCode).toEqual(StatusCodes.OK);
        expect(resBusca.body.length).toBeGreaterThan(0);
    });

});