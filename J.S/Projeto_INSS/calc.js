var currentNotation = 'in';

function changeNotation(notation) {
    currentNotation = notation;
}

function insert(num) {
    var numero = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = numero + num;

    var numero = document.getElementById('historico').innerHTML;
    document.getElementById('historico').innerHTML = numero + num;
}

function clean() {
    document.getElementById('resultado').innerHTML = "";
    document.getElementById('historico').innerHTML = "";
}

function back() {
    var resultado = document.getElementById('resultado').innerHTML;
    document.getElementById('resultado').innerHTML = resultado.substring(0, resultado.length - 1);
    var resultado = document.getElementById('historico').innerHTML;
    document.getElementById('historico').innerHTML = resultado.substring(0, resultado.length - 1);
}

function calcular() {
    var resultado = document.getElementById('resultado').innerHTML;
    if (resultado) {
        if (currentNotation === 'in') {
            document.getElementById('resultado').innerHTML = evalInfix(resultado);
        } else if (currentNotation === 'pre') {
            document.getElementById('resultado').innerHTML = evalPrefix(resultado);
        } else if (currentNotation === 'pos') {
            document.getElementById('resultado').innerHTML = evalPostfix(resultado);
        }
    } else {
        document.getElementById('resultado').innerHTML = '';
    }
}

// Função para avaliar expressão em notação Infixa
function evalInfix(expression) {
    return eval(toPostfix(expression));
}

// Função para avaliar expressão em notação Pré-Fixa
function evalPrefix(expression) {
    var tokens = expression.split(' ');
    tokens = tokens.reverse();
    return evalPrefixHelper(tokens);
}

function evalPrefixHelper(tokens) {
    var token = tokens.pop();
    if (!isNaN(parseFloat(token)) && isFinite(token)) {
        return parseFloat(token);
    } else {
        var operand2 = evalPrefixHelper(tokens);
        var operand1 = evalPrefixHelper(tokens);
        switch (token) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return operand1 / operand2;
        }
    }
}

// Função para avaliar expressão em notação Pós-Fixa
function evalPostfix(expression) {
    var tokens = expression.split(' ');
    var stack = [];
    tokens.forEach(function(token) {
        if (!isNaN(parseFloat(token)) && isFinite(token)) {
            stack.push(parseFloat(token));
        } else {
            var operand2 = stack.pop();
            var operand1 = stack.pop();
            switch (token) {
                case '+':
                    stack.push(operand1 + operand2);
                    break;
                case '-':
                    stack.push(operand1 - operand2);
                    break;
                case '*':
                    stack.push(operand1 * operand2);
                    break;
                case '/':
                    stack.push(operand1 / operand2);
                    break;
            }
        }
    });
    return stack.pop();
}

// Função para converter expressão Infixa para Pós-Fixa
function toPostfix(expression) {
    var precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };
    var outputQueue = [];
    var operatorStack = [];
    var tokens = expression.split(' ');

    tokens.forEach(function(token) {
        if (!isNaN(parseFloat(token)) && isFinite(token)) {
            outputQueue.push(token);
        } else if (token === '(') {
            operatorStack.push(token);
        } else if (token === ')') {
            while (operatorStack.length && operatorStack[operatorStack.length - 1] !== '(') {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.pop(); // Remover '('
        } else {
            while (operatorStack.length && precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]) {
                outputQueue.push(operatorStack.pop());
            }
            operatorStack.push(token);
        }
    });

    while (operatorStack.length) {
        outputQueue.push(operatorStack.pop());
    }

    return outputQueue.join(' ');
}


