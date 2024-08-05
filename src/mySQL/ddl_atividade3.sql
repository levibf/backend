create database atividade3;

use atividade3;

create table users(
id int primary key auto_increment,
`name` varchar(45),
username varchar(45) unique,
`password` varchar(45),
email varchar(45)
);

insert into users(`name`, username, `password`, email)
values ('frida', 'the evil', 'curupaco', 'ann_ann@gmail.com');

alter table users auto_increment=1635;

insert into users(`name`, username, `password`, email)
values ('buguelo', 'the calvo', 'quierespolo', 'dog_goblin@gmail.com');

create table projects(
id int primary key auto_increment,
`name` varchar(45),
`description` varchar(45),
`date` date
);

create table user_has_project(
users_id int not null,
projects_id int not null,
primary key(users_id, projects_id),
foreign key(users_id) references users(id),
foreign key(projects_id) references projects(id)
);