import * as create from './Create';
import * as deleteById from './DeleteById'
import * as updateById from './UpdateById'

export const CidadesProvider = {
    ...create,
    ...deleteById,
    ...updateById,
}