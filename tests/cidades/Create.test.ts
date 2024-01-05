import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe('Cidades - Create', () => {

    it('Cria registro', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({
                nome: 'Caxias do Sul'
            });

        expect(res1.statusCode).toEqual(StatusCodes.CREATED);
        expect(typeof res1.body).toEqual('number');

    });

    it('Não pode nome curto', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({
                nome: 'Ca'
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.nome')

    });

    it('Não pode conter valores nulos/vazios', async () => {

        const res1 = await testServer
            .post('/cidades')
            .send({
                nome: null
            });

        expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
        expect(res1.body).toHaveProperty('errorsResult.body.nome')

    });

});