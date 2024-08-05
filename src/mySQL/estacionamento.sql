create database estacionamento;

use estacionamento;

create table cliente(
idCliente int not null auto_increment primary key,
nome varchar(30) not null,
cpf varchar(14) not null,
data_nasc date not null
);

create table fabricante(
idFabricante int not null auto_increment primary key,
nomeFabricante varchar(20)
);

create table modelo(
idModelo int not null auto_increment primary key,
nomeModelo varchar(20) not null,
fkFabricante int not null,
foreign key(fkFabricante) references fabricante(idFabricante)
);

create table veiculo(
idVeiculo int not null auto_increment primary key,
placa varchar(8) not null unique,
fkModelo int not null,
foreign key(fkModelo) references modelo(idModelo),
fkCliente int not null,
foreign key(fkCliente) references cliente(idCliente),
ano int not null,
cor varchar(10) not null
);

create table patio(
idPatio int not null auto_increment primary key,
endereco varchar(140) not null,
capacidade int not null
);

create table estaciona(
idEstaciona int not null auto_increment primary key,
fkPatio int not null,
foreign key(fkPatio) references patio(idPatio),
fkVeiculo int not null,
foreign key(fkVeiculo) references veiculo(idVeiculo),
data_entrada date not null,
data_saida date,
hora_entrada varchar(10) not null,
hora_saida varchar(10)
);