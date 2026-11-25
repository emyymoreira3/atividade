
// app.js

import express from 'express';
import jogadorRoutes from './routes/jogadorRoutes.js';

const app = express();
const PORT = 3000;

// Middleware para interpretar JSON no corpo das requisições
app.use(express.json());

// Direciona as requisições para as rotas de jogadores
app.use('/jogadores', jogadorRoutes);

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
