let input1 = null;
let operator = null;
let currentNumber = "0";
let waitingForSecondNumber = false;

// Standard Math Functions
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => (b === 0 ? "NO." : a / b);

function roundResult(number) {
    if (number === "NO.") return number;
    // Rounds to 3 decimal places: (x * 1000) / 1000
    return Math.round(number * 1000) / 1000;
}

function operate(num1, op, num2) {
    const a = parseFloat(num1);
    const b = parseFloat(num2);
    switch (op) {
        case "+": return add(a, b);
        case "-": return subtract(a, b);
        case "x": return multiply(a, b);
        case "/": return divide(a, b);
        default: return b;
    }
}

const display = document.querySelector(".display");

// --- DIGIT LOGIC ---
function updateDisplay(digit) {
    if (waitingForSecondNumber) {
        currentNumber = digit;
        waitingForSecondNumber = false; // Reset so the next digit appends
    } else {
        currentNumber = currentNumber === "0" ? digit : currentNumber + digit;
    }
    display.textContent = currentNumber;
}

document.querySelectorAll(`.numBtns button`).forEach(button => {
    button.addEventListener('click', () => {
        const content = button.textContent;
        if (content === 'AC') clearDisplay();
        else if (content === '.') handleDecimal();
        else updateDisplay(content);
    });
});

// --- OPERATOR LOGIC ---
document.querySelectorAll(".opBtns button").forEach(button => {
    button.addEventListener("click", () => {
        const nextOperator = button.textContent;

        if (operator && waitingForSecondNumber) {
            operator = nextOperator; // User changed their mind on the operator
            return;
        }

        if (input1 === null) {
            input1 = parseFloat(currentNumber);
        } else if (operator) {
            const result = operate(input1, operator, currentNumber);
            display.textContent = roundResult(result);
            input1 = result;
        }

        waitingForSecondNumber = true; // Now we are waiting for the user to type input2
        operator = nextOperator;
    });
});

// --- EQUALS LOGIC ---
document.querySelector(".equalBtn button").addEventListener("click", () => {
    if (operator === null || waitingForSecondNumber) return;

    const result = operate(input1, operator, currentNumber);
    display.textContent = roundResult(result);
    
    // Prepare for a fresh start or continued operation
    input1 = result; 
    operator = null;
    waitingForSecondNumber = true; 
});

function handleDecimal() {
    if (waitingForSecondNumber) {
        currentNumber = "0.";
        waitingForSecondNumber = false;
    } else if (!currentNumber.includes(".")) {
        currentNumber += ".";
    }
    display.textContent = currentNumber;
}

function clearDisplay() {
    input1 = null;
    operator = null;
    currentNumber = "0";
    waitingForSecondNumber = false;
    display.textContent = "0";
}