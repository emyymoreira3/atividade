import { Router } from 'express';

import {
    getJogadores,
    getJogadorPorCamisa,
    getJogadoresPorPosicao,
    getMaiorSalario,
    postJogador,
    putJogador,
    deleteJogador
} from '../controllers/jogadorController.js';

const router = Router ()

// O prefixo '/jogadores' será definido no app.js
router.get('/', getJogadores);
router.get('/camisa/:numcamisa', getJogadorPorCamisa);
router.get('/posicao/:posi', getJogadoresPorPosicao);
router.get('/maiorSalario', getMaiorSalario);
router.post('/', postJogador);
router.put('/:numcamisa', putJogador);
router.delete('/:numcamisa', deleteJogador);

export default router;