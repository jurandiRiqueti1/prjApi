import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Pessoas - GetById', () => {

    let cidadeId: number | undefined = undefined;

    beforeAll(async () => {
        const resCidade = await testServer
            .post('/cidades')
            .send({
                nome: 'cidadeTeste'
            });                
        
        cidadeId = resCidade.body;
    });

    it('Procura registro por id', async () => {
        
        const res1 = await testServer
            .post('/pessoas')
            .send({
                nomeCompleto: 'Teste Teste',
                email: 'teste.teste@gmail.com',
                cidadeId
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);

        const resProcurada = await testServer
            .get(`/pessoas/${res1.body}`)
            .send();
            
        expect(resProcurada.statusCode).toEqual(StatusCodes.OK);
        expect(resProcurada.body).toHaveProperty('nomeCompleto');
    });

    it('Tenta procurar registro que não existe',async () => {
        
        const res1 = await testServer
            .get('/pessoas/99999')
            .send();

        expect(res1.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
        expect(res1.body).toHaveProperty('errors.default');
    })

})