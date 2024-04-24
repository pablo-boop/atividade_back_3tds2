const express = require('express');
const { Pool } = require('pg');

const app = express();
const port = 4000;

app.use(express.json());

//Rota de teste
app.get('/', (req, res) => {
    res.send('Servidor funcionando!')
})

//Configuração do banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'atividade_aula_back3tds2',
    password: 'bitinhoDB',
    port: 5432
})

//Função para calcular idade
function calcularIdade(data_nascimento) {
    let atual = new Date();
    let idade = atual.getFullYear() - data_nascimento.getFullYear()
    let mesAtual = atual.getMonth();
    let mesNascimento = data_nascimento.getMonth();

    if (mesNascimento > mesAtual || (mesNascimento == mesAtual && atual.getDate() < data_nascimento.getDate())) {
        idade--;
    }
    return idade;
}

//Função para calcular o signo
function calcularSigno(mes, dia) {

    if ((mes === 1 && dia >= 20) || (mes === 2 && dia <= 18)) {
        return 'Aquário';
    } else if ((mes === 2 && dia >= 19) || (mes === 3 && dia <= 20)) {
        return 'Peixes';
    } else if ((mes === 3 && dia >= 21) || (mes === 4 && dia <= 19)) {
        return 'Áries';
    } else if ((mes === 4 && dia >= 20) || (mes === 5 && dia <= 20)) {
        return 'Touro';
    } else if ((mes === 5 && dia >= 21) || (mes === 6 && dia <= 20)) {
        return 'Gêmeos';
    } else if ((mes === 6 && dia >= 21) || (mes === 7 && dia <= 22)) {
        return 'Câncer';
    } else if ((mes === 7 && dia >= 23) || (mes === 8 && dia <= 22)) {
        return 'Leão';
    } else if ((mes === 8 && dia >= 23) || (mes === 9 && dia <= 22)) {
        return 'Virgem';
    } else if ((mes === 9 && dia >= 23) || (mes === 10 && dia <= 22)) {
        return 'Libra';
    } else if ((mes === 10 && dia >= 23) || (mes === 11 && dia <= 21)) {
        return 'Escorpião';
    } else if ((mes === 11 && dia >= 22) || (mes === 12 && dia <= 21)) {
        return 'Sagitário';
    } else {
        return 'Capricórnio';
    }
}

//Rota que captura de todos os usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const resultado = await pool.query('SELECT * FROM usuarios');
        res.json({
            total: resultado.rowCount,
            usuarios: resultado.rows
        })
    } catch (error) {
        console.error('Erro ao capturar todos os usuarios!');
        res.status(500).send({ message: 'Erro ao capturar todos os usuarios!' })
    }
})

//Rota que adiciona um usuario
app.post('/usuarios', async (req, res) => {
    try {
        const { nome, sobrenome, data_nascimento, email } = req.body;

        const nascimento = new Date(data_nascimento);
        const idade = calcularIdade(nascimento);
        const signo = calcularSigno(nascimento.getMonth() + 1, nascimento.getDate());

        await pool.query('INSERT INTO usuarios (nome, sobrenome, data_nascimento, email, idade, signo) VALUES ($1, $2, $3, $4, $5, $6)', [nome, sobrenome, nascimento, email, idade, signo]);
        res.status(201).send({ mensagem: 'Usuário adicionado com sucesso' });
    } catch (error) {
        console.error('Erro ao adicionar usuário:', error);
        res.status(500).send('Erro ao adicionar usuário');
    }
});


//Rota de deletar usuario
app.delete('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
        res.status(200).send({ message: 'Usuário deletado com sucesso!' });
    } catch (error) {
        console.error('Erro ao deletar o usuário!');
        res.status(500).send({ message: 'Erro ao deletar o usuário!' });
    }
});

//Rota de editar usuario
app.put('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, sobrenome, data_nascimento, email } = req.body;

        let nascimento = new Date(data_nascimento);
        let idade = calcularIdade(nascimento);
        let signo = calcularSigno(nascimento.getMonth() + 1, nascimento.getDate());

        await pool.query('UPDATE usuarios SET nome = $1, sobrenome = $2, data_nascimento = $3, email = $4, idade = $5, signo = $6 WHERE id = $7', [nome, sobrenome, nascimento, email, idade, signo, id])
        res.status(200).send({ message: 'Sucesso ao editar o usuario!' })
    } catch (error) {
        console.error('Erro ao editar o usuário!', error);
        res.status(500).send({ message: 'Erro ao editar o usuário!' });
    }
})

//Rota de pegar por ID
app.get('/usuarios/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const resultado = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
        if (resultado.rowCount === 0) {
            res.status(404).send({ message: 'Erro ao procurar usuario ID!' })
        } else {
            res.status(200).send({
                message: 'Sucesso ao encontrar usuario por ID',
                usuario: resultado.rows
            })
        }
    } catch (error) {
    }
})

//Inicializar servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
})