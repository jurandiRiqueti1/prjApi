import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICidade } from "../../knex/models";

export const updateById = async (id: number, cidade: Omit<ICidade, 'id'>): Promise<void | Error> => {
    
    try {
        
        const result = await Knex(ETableNames.cidade)
            .where('id', '=', id)
            .update(cidade);

        if (result > 0) return;        

        return new Error('Erro ao atualizar registro');

    } catch (error) {
        console.log(error);
        return new Error('Erro ao atualizar registro');
    }
}