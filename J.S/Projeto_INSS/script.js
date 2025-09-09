function abrirMatematica() {
    window.location.href = 'matematica.html'; // Redireciona para a página Matematica
}

function abrirGerador() {
    window.location.href = 'gerador.html'; // Redireciona para a página Gerador
}

function calcularResultado() {
    // Captura os valores dos campos de entrada
    const rendaMensal = parseFloat(document.getElementById('renda').value);
    const dependentes = parseInt(document.getElementById('dps').value);
    const inss = parseFloat(document.getElementById('inss').value);
    const irrf = parseFloat(document.getElementById('irrf').value);

    // Verifica se todos os campos foram preenchidos corretamente
    if (isNaN(rendaMensal) || isNaN(dependentes) || isNaN(inss) || isNaN(irrf)) {
        alert('Por favor, preencha todos os campos corretamente.');
        return;
    }

    // Calcula o resultado
    const resultado = rendaMensal - (inss * dependentes) - irrf;

    // Exibe o resultado
    document.getElementById('resultado-display').textContent = resultado.toFixed(2);
}
