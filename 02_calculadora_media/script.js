
const campoNome = document.getElementById("nome");
const campoNota1 = document.getElementById("nota1");
const campoNota2 = document.getElementById("nota2");
const campoNota3 = document.getElementById("nota3");
const botaoCalcular = document.getElementById("botao-calcular");
const caixaResultado = document.getElementById("resultado");

// Função que recebe 3 números e devolve a média
function calcularMedia(n1, n2, n3) {
    return (n1 + n2 + n3) / 3;
}

// Função que recebe a média e devolve a situação do aluno
function descobrirSituacao(media) {
    if (media >= 7) {
        return "aprovado";
    } else if (media >= 5) {
        return "recuperacao";
    } else {
        return "reprovado";
    }
}

// Função que mostra uma mensagem na caixa de resultado com a cor certa
function mostrarResultado(texto, classeDaCor) {
    // Tira as cores antigas e a classe que escondia a caixa
    caixaResultado.classList.remove(
        "escondido",
        "aprovado",
        "recuperacao",
        "reprovado",
        "erro"
    );

    // Coloca a cor nova
    caixaResultado.classList.add(classeDaCor);
    caixaResultado.textContent = texto;
}

botaoCalcular.addEventListener("click", function () {
    // .value sempre vem como TEXTO. Number() transforma em número.
    const nome = campoNome.value.trim();
    const nota1 = Number(campoNota1.value);
    const nota2 = Number(campoNota2.value);
    const nota3 = Number(campoNota3.value);

    // Verifica se algum campo ficou vazio
    if (
        nome === "" ||
        campoNota1.value === "" ||
        campoNota2.value === "" ||
        campoNota3.value === ""
    ) {
        mostrarResultado("Preencha o nome e as 3 notas.", "erro");
        return; // para a função aqui
    }

    const media = calcularMedia(nota1, nota2, nota3);
    const situacao = descobrirSituacao(media);

    // toFixed(1) deixa só 1 casa decimal (7.25 vira "7.3")
    // replace troca o ponto pela vírgula, como escrevemos no Brasil
    const mediaFormatada = media.toFixed(1).replace(".", ",");

    if (situacao === "aprovado") {
        mostrarResultado(
            `✅ ${nome} foi aprovado(a) com média ${mediaFormatada}!`,
            "aprovado"
        );
    } else if (situacao === "recuperacao") {
        mostrarResultado(
            `⚠️ ${nome} está de recuperação com média ${mediaFormatada}.`,
            "recuperacao"
        );
    } else {
        mostrarResultado(
            `❌ ${nome} foi reprovado(a) com média ${mediaFormatada}.`,
            "reprovado"
        );
    }
});
