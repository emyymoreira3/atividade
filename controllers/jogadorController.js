import * as JogadorModel from '../models/jogadorModel.js';

// GET /jogadores
export const getJogadores = (req, res) => {
    const jogadores = JogadorModel.listarTodos();
    res.status(200).json(jogadores);
};

// GET /jogadores/camisa/:numcamisa
export const getJogadorPorCamisa = (req, res) => {
    const numcamisa = parseInt(req.params.numcamisa);
    const jogador = JogadorModel.buscarPorCamisa(numcamisa);

    if (jogador) {
        res.status(200).json(jogador);
    } else {
        res.status(404).json({
            mensagem: `Jogador ${numcamisa} não encontrado`
        });
    }
};

// GET /jogadores/posicao/:posi
export const getJogadoresPorPosicao = (req, res) => {
    const posi = req.params.posi.trim();
    const jogadores = JogadorModel.buscarPorPosicao(posi);

    if (jogadores.length > 0) {
        res.status(200).json(jogadores);
    } else {
        res.status(404).json({
            mensagem: `Jogadores da posição ${posi} não encontrados`
        });
    }
};

// GET /jogadores/maiorSalario
export const getMaiorSalario = (req, res) => {
    const jogador = JogadorModel.buscarMaiorSalario();
    res.status(200).json(jogador);
};

// POST /jogadores
export const postJogador = (req, res) => {
    const { jogador, posicao, numcamisa, salario } = req.body;

    if (!jogador || posicao === undefined || numcamisa === undefined || !salario) {
        return res.status(400).json({
            mensagem: 'Todos os campos (jogador, posicao, numcamisa, salario) são obrigatórios'
        });
    }

    if (JogadorModel.buscarPorCamisa(parseInt(numcamisa))) {
        return res.status(400).json({
            mensagem: 'Já existe um jogador com essa camisa'
        });
    }

    const novoJogador = JogadorModel.criar({
        jogador, posicao, numcamisa, salario
    });

    res.status(201).json(novoJogador);
};


// PUT /jogadores/:numcamisa
export const putJogador = (req, res) => {
    const camisa = parseInt(req.params.numcamisa);
    const { jogador, posicao, numcamisa, salario } = req.body;

    if (!jogador || !posicao || numcamisa === undefined || salario === undefined) {
        return res.status(400).json({
            mensagem: 'Todos os campos são obrigatórios'
        });
    }

    const jogadorExistente = JogadorModel.buscarPorCamisa(camisa);

    if (!jogadorExistente) {
        return res.status(404).json({
            mensagem: `Jogador com camisa ${camisa} não encontrado`
        });
    }

    const jogadorAtualizado = JogadorModel.atualizar(camisa, {
        jogador, posicao, salario
    });

    res.status(200).json(jogadorAtualizado);
};

// DELETE /jogadores/:numcamisa
export const deleteJogador = (req, res) => {
    const camisa = parseInt(req.params.numcamisa);
    const jogadorRemovido = JogadorModel.remover(camisa);

    if (!jogadorRemovido) {
        return res.status(404).json({
            mensagem: `Jogador com camisa ${camisa} não encontrado`
        });
    }

    res.status(200).json({
        mensagem: `Jogador ${jogadorRemovido.jogador} removido com sucesso`
    });
};