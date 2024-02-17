import * as create from './Create';
import * as deleteById from './DeleteById'
import * as updateById from './UpdateById'
import * as getAll from './GetAll'
import * as getById from './GetById'
import * as count from './Count'

export const pessoasProvider = {
    ...create,
    ...deleteById,
    ...updateById,
    ...getAll,
    ...getById,
    ...count
}