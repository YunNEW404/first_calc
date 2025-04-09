let a = '';          
let b = '';          
let sign = '';       
let finish = false;   
let expression = ''; 
const MAX_LENGTH = 10; 
const DIGIT = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const ACTION = ['-', '+', 'X', '/'];

const display = document.querySelector('.display');
function clearAll() {
    a = '';
    b = '';
    sign = '';
    finish = false;
    expression = '';
    display.value = '0';
}
function operate(num1, num2, operation) {
    const num1Parsed = parseFloat(num1);
    const num2Parsed = parseFloat(num2);

    if (isNaN(num1Parsed) || isNaN(num2Parsed)) {
        return 'Ошибка'; 
    }

    if (operation === '+') return num1Parsed + num2Parsed;
    if (operation === '-') return num1Parsed - num2Parsed;
    if (operation === 'X') return num1Parsed * num2Parsed;
    if (operation === '/') {
        if (num2Parsed === 0) return 'ERROR';
        return num1Parsed / num2Parsed;
    }
    return num2Parsed; 
}
function updateDisplay() {
    if (expression.length > MAX_LENGTH) {
        expression = expression.slice(0, MAX_LENGTH);
    }
    display.value = expression;
}
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelector('.buttons');
    const allClearButton = document.querySelector('.AllClear');

    if (allClearButton) {
        allClearButton.addEventListener('click', () => {
            clearAll();
        });
    }

    buttons.addEventListener('click', (event) => {
        if (!event.target.classList.contains('btn')) return;

        const key = event.target.textContent;

        if (DIGIT.includes(key)) {
            if (key === '.' && ((sign === '' && a.includes('.')) || (sign !== '' && b.includes('.')))) {
                return;
            }

            if (sign === '') {
                if (a.length < MAX_LENGTH) {
                    a += key;
                    expression = a;
                }
            } else {
                if (b.length < MAX_LENGTH) {
                    b += key;
                    expression = a + sign + b;
                }
            }
            updateDisplay();
            return;
        }

        if (ACTION.includes(key)) {
            if (a === '' && expression !== 'Деление на 0!' && expression !== 'Ошибка') return;
            if (sign !== '' && b !== '') {
                a = operate(a, b, sign);
                if (a === 'Деление на 0!' || a === 'Ошибка') {
                    expression = a;
                    updateDisplay();
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                expression = a;
            }
            sign = key;
            expression = a + sign;
            updateDisplay();
            b = ''; 
            return;
        }
        if (key === '=') {
            if (a === '' || b === '' || sign === '') return;
            a = operate(a, b, sign);
             if (a === 'Деление на 0!' || a === 'Ошибка') {
                    expression = a;
                    updateDisplay();
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
            expression = a;
            updateDisplay();
            b = '';
            sign = '';
            finish = true;
            return;
        }
    });
});