const display = document.querySelector(".calc-display");
const buttons = document.querySelectorAll(".btns button");

let firstNumber = "";
let operator = "";
let secondNumber = "";
let resetDisplay = false;

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

buttons.forEach(button => {
    button.addEventListener("click",() => {
        const value = button.textContent;

        if (!isNaN(value)) {
            appendNumber(value);
        } else if (value === "=") {
            evaluate();
        } else if (value === "AC") {
            clearDisplay();
        } else {
            setOperator(value);
        }
    })
})

function operate(a, op, b) {
    a = Number(a);
    b = Number(b);

    if (op === "+") return add(a, b);
    if (op === "-") return subtract(a, b);
    if (op === "÷") return divide(a, b);
    if (op === "x") return multiply(a, b);
}

function appendNumber(num) {
    if (display.textContent === "0" || resetDisplay) {
        display.textContent = num;
        resetDisplay = false; 
    } else {
        display.textContent += num;
    }
}

function setOperator(op) {
    firstNumber = display.textContent;
    operator = op;
    resetDisplay = true;
}

function evaluate() {
    secondNumber = display.textContent;

    const result = operate(firstNumber, operator, secondNumber);

    display.textContent = result;

    firstNumber = result;
    operator = "";
}

function clearDisplay() {
    display.textContent = "0";
    firstNumber = "";
    operator = "";
    secondNumber = "";
}
