const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');

// Variables to store the input
let currentInput = '';
let operator = '';
let previousInput = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const buttonText = button.textContent;

        if (!isNaN(buttonText) || buttonText === '.') {
            currentInput += buttonText;
            display.value = currentInput;
        } else if (buttonText === 'DEL') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput || '0';
        } else if (buttonText === 'RESET') {
            // Handle reset
            currentInput = '';
            previousInput = '';
            operator = '';
            display.value = '0';
        } else if (buttonText === '=') {
            // Handle equals
            if (operator && previousInput) {
                currentInput = calculate(previousInput, currentInput, operator);
                display.value = currentInput;
                previousInput = '';
                operator = '';
            }
        } else {
            if (currentInput) {
                previousInput = currentInput;
                currentInput = '';
                operator = buttonText === '×' ? '*' : buttonText === '/' ? '/' : buttonText;
            }
        }
    });
});

function calculate(prev, curr, op) {
    const prevNumber = parseFloat(prev);
    const currNumber = parseFloat(curr);

    switch (op) {
        case '+':
            return (prevNumber + currNumber).toString();
        case '-':
            return (prevNumber - currNumber).toString();
        case '*':
            return (prevNumber * currNumber).toString();
        case '/':
            return currNumber !== 0 ? (prevNumber / currNumber).toString() : 'Error';
        default:
            return curr;
    }
}
