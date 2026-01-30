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

function operate(num1, op, num2) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);

    switch (op) {
        case "+": 
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "x": 
            return multiply(a, b);
        case "/":
            return divide(a, b);
        default:
            return null;
    }
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
    currentNumber = "";
    input1 = undefined;
    input2 = undefined;
    operator = undefined;
    display.textContent = "0";
}

function handleDecimal() {
    if (!currentNumber.includes(".")) {
        currentNumber += ".";
        display.textContent = currentNumber;
    }
}

const opButtons = document.querySelectorAll(".opBtns button");

opButtons.forEach(button => {
    button.addEventListener("click", () => {
        input1 = currentNumber;
        operator = button.textContent;
        currentNumber = "";
    })
})

const equalBtn = document.querySelector(".equalBtn button");

equalBtn.addEventListener("click", () => {
    if (input1 === undefined || operator === undefined) return;

    input2 = currentNumber;

    const result = operate(input1, operator, input2);

    display.textContent = result;
    currentNumber = result.toString();
    input1 = undefined;
    operator = undefined;
});