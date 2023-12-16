drop database if exists testeClienteServico;

create database if not exists testeClienteServico;

use testeClienteServico;

create table clientePf (
	id int not null auto_increment primary key,
    nome varchar(60)
);

create table clientePj (
	id int not null auto_increment primary key,
    nome varchar(60)
);

create table servico (
	id int not null auto_increment primary key,
    id_clientePf int default null,
    id_clientePj int default null,
    tipoCliente enum('pf','pj') default 'pf',
    foreign key (id_clientePf) references clientePf(id),
    foreign key (id_clientePj) references clientePj(id)
);

insert into clientePf (nome) values ('pf1');
insert into clientePf (nome) values ('pf2');
insert into clientePf (nome) values ('pf3');
insert into clientePf (nome) values ('pf4');

insert into clientePj (nome) values ('pj1');
insert into clientePj (nome) values ('pj2');
insert into clientePj (nome) values ('pj3');
insert into clientePj (nome) values ('pj4');

insert into servico (id_clientePf, id_clientePj, tipoCliente) 
values ('1', null, 'pf');

insert into servico (id_clientePf, id_clientePj, tipoCliente) 
values (null, '2', 'pj');

insert into servico (id_clientePf, id_clientePj, tipoCliente) 
values ('3', null, 'pf');

select * from servico join clientePj on servico.id_clientePj = clientePj.id;