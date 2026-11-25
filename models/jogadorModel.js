// Emilly Moreira
export const jogadores = [
     {jogador: "Joao da Silva",
        posicao: "Lateral direito",
        numcamisa: 33,
        salario: 545000.00},


    {jogador: "Pedro Santos",
        posicao: "Goleiro",
        numcamisa: 1,
        salario: 350000.00},


    {jogador: "Carlos Oliveira",
        posicao: "Atacante",
        numcamisa: 9,
        salario: 800000.00},


    {jogador: "Lucas Ferreira",
        posicao: "Meio campo",
        numcamisa: 10,
        salario: 650000.00},


    {jogador: "Marcos Souza",
        posicao: "Zagueiro",
        numcamisa: 4,
        salario: 400000.00}
]

//Retorna todos os jogadores
export const listarTodos = () => {
    return jogadores;
};

// Filtra jogadores por número da camisa
export const buscarPorCamisa = (numcamisa) => {
    return jogadores.find(j => j.numcamisa === numcamisa);
};

// Filtra jogadores por posição
export const buscarPorPosicao = (posi) => {
    return jogadores.filter(
        j => j.posicao.toLowerCase() === posi.toLowerCase()
    );
};

// Busca o jogador com o maior salário
export const buscarMaiorSalario = () => {
    return jogadores.reduce((maior, atual) => {
        return atual.salario > maior.salario ? atual : maior;
    });
};

// Cria um novo jogador
export const criar = ({ jogador, posicao, numcamisa, salario }) => {
    const novoJogador = {
        jogador,
        posicao,
        numcamisa: parseInt(numcamisa),
        salario: parseFloat(salario)
    };

    jogadores.push(novoJogador);
    return novoJogador;
};

// Muda um jogador existente
export const atualizar = (numcamisa, { jogador, posicao, salario }) => {
    const index = jogadores.findIndex(j => j.numcamisa === numcamisa);

    if (index === -1) return null;

    jogadores[index] = {
        jogador,
        posicao,
        numcamisa,
        salario: parseFloat(salario)
    };

    return jogadores[index];
};

// Deleta um jogador 
export const remover = (numcamisa) => {
    const index = jogadores.findIndex(j => j.numcamisa === numcamisa);

    if (index === -1) return null;

    const [jogadorRemovido] = jogadores.splice(index, 1);
    return jogadorRemovido;
};