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
        "AC", "C", "%", "/",
        "7", "8", "9", "*",
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
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        case "%":
            return num1 % num2;
        default:
            return;
    }
}

const buttons = document.querySelectorAll("#button-container button");

buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let content = e.target.textContent;
        let isNumber = !isNaN(Number(content));
        let isDot = (content === ".")

        if (content === "AC") {
            displayValue = "0";
            displayResult = "";
            equation.operator = null;
            equation.firstNum = null;
            equation.secondNum = null;
            value.textContent = displayValue;
            result.textContent = displayResult;
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
            if (displayValue.includes(content) === false) {
                displayValue += content;
            }
        } else {
            if (content === "C") {
                displayValue = displayValue.toString().slice(0, -1);
                if (displayValue === "") {
                    displayValue = "0";
                }
                value.textContent = displayValue;
                return
            } else if (equation.firstNum !== null
                && equation.operator !== null
                && equation.secondNum !== null) {
                    equation.secondNum = Math.round(Number(displayValue) * 10e6) / 10e6;
                    if (equation.secondNum === 0 && equation.operator === "/") {
                        alert("You can't divide a number with 0!");
                        return;
                    }
                    if (content === "=") {
                        displayValue = Math.round(operate(equation.operator, equation.firstNum, equation.secondNum) * 10e6) / 10e6;
                        displayResult = `${equation.firstNum} ${equation.operator} ${equation.secondNum} =`;
                        equation.firstNum = Math.round(operate(equation.operator, equation.firstNum, equation.secondNum) * 10e6) / 10e6;
                        equation.operator = null;
                        equation.secondNum = null;
                    } else {
                        equation.firstNum = Math.round(operate(equation.operator, equation.firstNum, equation.secondNum) * 10e6) / 10e6;
                        equation.operator = content;
                        equation.secondNum = null;
                        displayValue = equation.firstNum;
                        displayResult = `${equation.firstNum} ${equation.operator}`;
                    }
            } else {
                if (equation.firstNum === null) {
                    equation.firstNum = Math.round(Number(displayValue) * 10e6) / 10e6;
                }
                equation.operator = content;
                displayResult = `${equation.firstNum} ${equation.operator}`;
            }
        }
        value.textContent = displayValue;
        result.textContent = displayResult;
    });
})
