initButtons();

const equation = {
    operator: null,
    firstNum: null,
    secondNum: null
}

let displayValue = "";

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

function displayContent(content) {
    const value = document.querySelector("#value");
    value.textContent = content;
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
        default:
            return;
    }
}


const buttons = document.querySelectorAll("#button-container button");
buttons.forEach(button => {
    button.addEventListener("click", (e) => {
        let content = e.target.textContent;

        if (isNaN(Number(content)) === false) {
                
            if(equation.operator === null && equation.firstNum !== null) {
                equation.operator = displayValue;
                displayValue = "";
            }
            displayValue += content;
        } else if (content === "."){
            if (displayValue.includes(content) === false) {
                displayValue += content;
            }
        } else {
            if (equation.operator !== null
                && equation.firstNum !== null
                && equation.secondNum !== null){
                equation.firstNum = operate(equation.operator, equation.firstNum, equation.secondNum);
                equation.operator = null;
                equation.secondNum = null;
            }
            else if (equation.firstNum === null) {
                equation.firstNum = Number(displayValue);
            } else {
                equation.secondNum = Number(displayValue);
            }
            displayValue = content;
        }
        displayContent(displayValue);
    }) 
})

