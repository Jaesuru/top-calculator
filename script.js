let input1;
let operator;
let input2;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(num1, calOp, num2) {
    let result = calOp(num1, num2);
    return result;
}

const display = document.querySelector(".display");

const numButtons = document.querySelectorAll(`.numBtns button`);

let currentNumber = ``;

function updateDisplay(digit) {
    if (currentNumber === "0") {
        currentNumber = digit;
    } else {
        currentNumber += digit;
    }

    display.textContent = currentNumber;
}

numButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (button.textContent === 'AC') {
            clearDisplay();
        } else if (button.textContent === '.') {
            handleDecimal();
        } else {
            updateDisplay(button.textContent);
        }
    });
});

function clearDisplay() {
    currentNumber = "0";
    display.textContent = currentNumber;
}

function handleDecimal() {
    if (!currentNumber.includes(".")) {
        currentNumber += ".";
        display.textContent = currentNumber;
    }
}