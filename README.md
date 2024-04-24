# Atividade Aula Back - 3TDS2

## Descrição
Este é um projeto de exemplo para a disciplina de Desenvolvimento Back-end da turma 3TDS2. O objetivo deste projeto é fornecer um ponto de partida para o desenvolvimento de aplicações web utilizando Node.js, Express e PostgreSQL.

## Requisitos
Certifique-se de ter o Node.js e o PostgreSQL instalados em seu ambiente de desenvolvimento.

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)

## Instalação

Clone este repositório para o seu ambiente local:
   ```bash
   git clone https://github.com/seu-usuario/atividadeaulaback-3tds2.git
   ```

### Navegue até o diretório
`cd atividadeaulaback-3tds2`

### Instale as dependências do projeto utilizando o npm
`npm install`

## Configuração do Banco de Dados

Certifique-se de ter o PostgreSQL instalado e em execução em seu sistema.

Crie um banco de dados PostgreSQL para este projeto.

Atualize as configurações do banco de dados no arquivo `index.js` com as suas credenciais:

```javascript
const pool = new Pool({
  user: 'seu_usuario',
  host: 'localhost',
  database: 'seu_banco_de_dados',
  password: 'sua_senha',
  port: 5432,
});

```
### Inicialização do Projeto
`npm run dev`
