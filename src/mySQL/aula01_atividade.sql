create database biblioteca;

use biblioteca;

create table autores(
id int primary key auto_increment not null,
nome varchar(100) not null,
nacionalidade varchar(50) not null
);

ALTER TABLE autores ADD nascimento date not null;

insert into autores(nome, nacionalidade, nascimento)
values
('J.K. Rowling', 'Britânica', 1965-07-31),
('George R.R. Martin', 'Americano', 1948-09-20),
('J.R.R. Tolkien', 'Britânico', 1892-01-03),
('Isaac Asimov', 'Americano', 1920-01-02),
('Arthur Conan Doyle', 'Escocês', 1859-05-22),
('Jane Austen', 'Americana', 1775-12-16);

create table categorias(
id int primary key auto_increment not null,
nome varchar(50) not null
);

insert into categorias(nome)
values
('Fantasia'),
('Ficção Científica'),
('Mistério'),
('Romance');

create table livros(
id int primary key auto_increment not null,
titulo varchar(100) not null,
ano_publicacao int not null,
preco decimal(6,2) not null,
autor_id int not null,
foreign key(autor_id) references autores(id),
categoria_id int not null,
foreign key(categoria_id) references categorias(id)
);

insert into livros(titulo, ano_publicacao, preco, autor_id, categoria_id)
values
('Harry Potter e a pedra filosofal', 1997, 39.90, 1, 1),
('Game of Thrones', 1996, 49.90, 2, 1),
('O Senhor dos Anéis', 1954, 59.90, 3, 1),
('Eu, Robô', 1950, 29.90, 4, 2),
('O Hobbit', 1937, 34.90, 3, 1),
('As Aventuras de Sherlock Holmes', 1892, 24.90, 5, 3),
('Orgulho e Preconceito', 1813, 19.90, 6, 4);

alter table livros modify preco decimal(6,2) not null;