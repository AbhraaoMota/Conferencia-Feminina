const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Aqui conectamos com a sua "garagem" (PostgreSQL)
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'conferencia_db',
  password: '1821', // Coloque sua senha de super-herói aqui!
  port: 5432,
});

// Essa é a rota que recebe os dados do formulário
app.post('/inscrever', async (req, res) => {
  const { nome, cpf, telefone, congregacao, outra_igreja } = req.body;

  try {
    const query = 'INSERT INTO inscritas (nome_completo, cpf, telefone, congregacao, outra_igreja) VALUES ($1, $2, $3, $4, $5)';
    await pool.query(query, [nome, cpf, telefone, congregacao, outra_igreja]);
    res.status(200).send({ mensagem: "Salvo com sucesso!" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ erro: "Erro ao salvar no banco" });
  }
});

app.listen(3000, () => {
  console.log("O tradutor está ouvindo na porta 3000!");
});