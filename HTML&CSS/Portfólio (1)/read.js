//Aplicando funcionalidade 'Ler mais' aos cards ----------------------------------------------

// Seleciona todos os botões "Ler mais"
var buttons = document.querySelectorAll('.card #read_button');

// Itera sobre cada botão e adiciona o evento de clique
buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Encontra o card pai do botão clicado
        var card = this.closest('.card');

        // Adiciona ou remove a classe 'active' no card
        card.classList.toggle('active');

        // Altera o texto do botão com base na presença da classe 'active'
        if (card.classList.contains('active')) {
            this.textContent = 'Ler menos';
        } else {
            this.textContent = 'Ler mais';
        }
    });
});
