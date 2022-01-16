initButtons();

const equation = {
    operator: null,
    firstNum: null,
    secondNum: null
}

let displayValue = "0";
const value = document.querySelector("#value");
let displayResult = "";
const result = document.querySelector("#result");

function initButtons() {
    const buttonLayout = [
        "AC", "C", "%", "÷",
        "7", "8", "9", "×",
        "4", "5", "6", "-",
        "1", "2", "3", "+",
        ".", "0", "+/-", "=" 
    ];
    const buttonContainer = document.querySelector("#button-container");

    for (let value of buttonLayout) {
        const button = document.createElement("button");
        if (isNaN(Number(value))) {
            if (value === "=") {
                button.classList.add("equal");
            } else {
                button.classList.add("operator");
            }
        } else {
            button.classList.add("number");
        }
        button.textContent = value;
        buttonContainer.appendChild(button);
    }
}

function operate(operator, num1, num2) {
    switch(operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "×":
            return num1 * num2;
        case "÷":
            return num1 / num2;
        case "%":
            return num1 % num2;
        default:
            return;
    }
}

function clearContent() {
    displayValue = "0";
    displayResult = "";
    equation.operator = null;
    equation.firstNum = null;
    equation.secondNum = null;
    value.textContent = displayValue;
    result.textContent = displayResult;
}

function deleteContent() {
    displayValue = displayValue.toString().slice(0, -1);
    if (displayValue === "") {
        displayValue = "0";
    }
    value.textContent = displayValue;
}

function toNumFit(num) {
    return Math.round(num * 10e6) / 10e6;
}

function display(contentVal, contentRes) {
    value.textContent = contentVal;
    result.textContent = contentRes;
}

const buttons = document.querySelectorAll("#button-container button");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let content = e.target.textContent;
        let isNumber = !isNaN(Number(content));
        let isDot = (content === ".");
        let isEquationFull = (equation.firstNum !== null
                            && equation.operator !== null
                            && equation.secondNum !== null);

        if (content === "AC") {
            clearContent();
            return;
        }
        if (isNumber) {
            if(equation.firstNum !== null && equation.operator !== null && equation.secondNum === null) {
                displayValue = "0";
                equation.secondNum = 0;
            }
            if (displayValue !== "0") {
                displayValue += content;
            } else {
                displayValue = content;
            }
        } else if (isDot) {
            if (displayValue.toString().includes(content) === false) {
                displayValue += content;
            }
        } else {
            if (content === "C") {
                deleteContent();
                return
            }
            if (content === "+/-") {
                displayValue = -toNumFit(Number(displayValue));
                value.textContent = displayValue;
                return;
            }
            if (isEquationFull) {
                equation.secondNum = toNumFit(Number(displayValue));
                if (equation.secondNum === 0 && equation.operator === "/") {
                    alert("You can't divide a number with 0!");
                    return;
                }
                if (content === "=") {
                    displayValue = toNumFit(operate(equation.operator, equation.firstNum, equation.secondNum));
                    displayResult = `${equation.firstNum} ${equation.operator} ${equation.secondNum} =`;
                    equation.firstNum = toNumFit(operate(equation.operator, equation.firstNum, equation.secondNum));
                    equation.operator = null;
                    equation.secondNum = null;
                    display(displayValue, displayResult);
                    return;
                } else {
                    equation.firstNum = toNumFit(operate(equation.operator, equation.firstNum, equation.secondNum));
                    equation.operator = content;
                    equation.secondNum = null;
                    displayValue = equation.firstNum;
                    displayResult = `${equation.firstNum} ${equation.operator}`;
                    display(displayValue, displayResult);
                    return;
                }
            }
            if (equation.firstNum === null) {
                equation.firstNum = toNumFit(Number(displayValue));
            }
            equation.operator = content;
            equation.firstNum = toNumFit(Number(displayValue));
            displayResult = `${equation.firstNum} ${equation.operator}`;
        }
        display(displayValue, displayResult);
    });
})
