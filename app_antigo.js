// Emilly Moreira
import express from 'express';
import { jogadores } from './jogador.js';


const app = express();
const PORT = 3000;
app.use(express.json());


// ROTA GET - Listar todos
app.get('/jogadores', (req, res) => {
    res.status(200).json(jogadores);
});


// ROTA GET - Listar por número da camisa
app.get('/jogadores/camisa/:numcamisa', (req, res) => {
    const numcamisa = parseInt(req.params.numcamisa);
    const jogador = jogadores.find(j => j.numcamisa === numcamisa);
    if (!jogador) {
        return res.status(404).json({ mensagem: `Jogador ${numcamisa} não encontrado` });
    }
    res.json(jogador);
});


// ROTA GET - Listar por posição
app.get('/jogadores/posicao/:posi', (req, res) => {
    const posi = req.params.posi;
    const jogador = jogadores.filter(j => j.posicao === posi);
    if (jogador.length === 0) {
        return res.status(404).json({
            mensagem: `Jogadores da posição ${posi} não encontrados`
        });
    }
    res.json(jogador);
});


// ROTA GET - Listar o maior salário
app.get('/jogadores/maiorSalario', (req, res) => {
    const maior = jogadores.reduce((maior, atual) => {
        return atual.salario > maior.salario ? atual : maior;
    });
    res.json(maior);
});


// ROTA POST - Incluir um novo jogador 
app.post('/jogadores', (req, res) => {
    const { jogador, posicao, numcamisa, salario } = req.body;
    if (!jogador || posicao === undefined || numcamisa === undefined || !salario) {
        return res.status(400).json({
            mensagem: `Todos os campos (jogador,posicao,numcamisa,salario) são obrigatórios`
        })
    }
 if (jogadores.some(j => j.numcamisa === parseInt(numcamisa))) {
    return res.status(400).json({
        mensagem: 'Já existe um jogador com essa camisa'
    });
}
    const novoJogador = {
        jogador,
        posicao,
        numcamisa: parseInt(numcamisa),
        salario: parseFloat(salario)
    };
    jogadores.push(novoJogador);
    res.status(201).json(novoJogador);
});


// ROTA PUT - Alterar um jogador existente
app.put('/jogadores/:numcamisa', (req, res) => {
    const camisa = parseInt(req.params.numcamisa);
    const { jogador, posicao, numcamisa, salario } = req.body;
    const index = jogadores.findIndex(j => j.numcamisa === camisa);
    if (index === -1) {
        return res.status(404).json({
            mensagem: `Jogador com camisa ${camisa} não encontrado`
        });
    }
    if (!jogador || !posicao || numcamisa === undefined || salario === undefined) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios'
        });
    }
    jogadores[index] = {
        jogador,
        posicao,
        numcamisa: parseInt(numcamisa),
        salario: parseFloat(salario)
    };
    res.status(200).json(jogadores[index]);
});


// ROTA DELETE - Excluir um jogador 
app.delete('/jogadores/:numcamisa', (req, res) => {
    const camisa = parseInt(req.params.numcamisa);
    const index = jogadores.findIndex(j => j.numcamisa === camisa);
    if (index === -1) {
        return res.status(404).json({
            mensagem: `Jogador com camisa ${camisa} não encontrado`
        });
    }
    const [jogadorRemovido] = jogadores.splice(index, 1);
    res.status(200).json({
        mensagem: `Jogador ${jogadorRemovido.jogador} removido com sucesso`
    });
});


app.listen(PORT, () => {
    console.log(`Servidor roteando em http://localhost:${PORT}`);
    console.log(`Acesse http://localhost:${PORT}/jogadores para testar`);
});