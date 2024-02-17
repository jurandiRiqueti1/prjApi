import type { Knex } from 'knex';
import { ETableNames } from '../ETableNames';


export async function up(knex: Knex) {
    return knex
        .schema
        .createTable(ETableNames.pessoa, table => {
            table.bigIncrements('id').primary().index();
            table.string('nomeCompleto').index().notNullable();
            table.string('email').unique().notNullable();
            
            table
             .bigInteger('cidadeId')
             .index()
             .notNullable()
             .references('id') //referencia o id
             .inTable(ETableNames.cidade) //seleciona a tabela que será referenciado o id
             .onUpdate('CASCADE')
             .onDelete('RESTRICT');
        
            table.comment('Tabela usada para armazenar cidades do sistema.');
        })
        .then(() => {
            console.log(`# Create table ${ETableNames.pessoa}`);
        })
}


export async function down(knex: Knex) {
    return knex
        .schema
        .dropTable(ETableNames.pessoa)
        .then(() => {
            console.log(`# Drop table ${ETableNames.pessoa}`);
        });
}