create database tiaKatya;

use tiaKatya;

create table alunos (
id int primary key auto_increment not null,
nome varchar(150) not null,
data_nascimento date not null,
responsavel varchar(150) not null,
cor_favorita varchar(20),
alergias bool
);

create table turma (
id int primary key auto_increment not null,
nome varchar(10) not null
);

create table alunos_turmas(
fk_aluno int not null,
fk_turma int not null,
primary key(fk_aluno, fk_turma),
foreign key(fk_aluno) references alunos(id),
foreign key(fk_turma) references turma(id)
);