CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    sobrenome VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    email VARCHAR(100) NOT NULL,
    idade INT,
    signo VARCHAR(100)
);

INSERT INTO usuarios (nome, sobrenome, data_nascimento, email) VALUES ('boyPablo', 'teste', '2000-01-01', 'boyPablo@email.com');