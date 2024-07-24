document.addEventListener("DOMContentLoaded",function () {
    const buttons = document.querySelectorAll(".button");
    const expressionElement = document.querySelector(".expression");
    const resultElement = document.querySelector(".result-text");

    let expression = "";

    buttons.forEach((button) => {
    button.addEventListener("click",function () {
        const buttonText = this.textContent.trim();
        buttonText.replace("sup", "");
        buttonText.replace("sub", "");
        buttonText.replace(">", "");
        buttonText.replace("<", "");
        buttonText.replace("/", "");
        buttonText.replace("x", "");
        buttonText.replace(" ", "");
        console.log(buttonText);
        if (button.classList.contains("spl-button")) {
            handleSpecialFunction(buttonText);
        }
        else {
            handleInput(buttonText);
        }
    });
    });

    document.addEventListener("keydown",function (event) {
        handleKeyPress(event);
    });

function handleInput(input) {
    switch (input) {
        case "ex":
            expression += "Math.E**";
        break;
        case "log10":
            expression += "Math.log10(";
        break;
        case "Log":
            expression += "Math.log(";
        break;
        case "xy":
            expression += "10**";
        break;
        case "√":
            expression += "Math.sqrt(";
        break;
        default:
            expression += input;
        break;
    }
    updateDisplay();
}

function handleSpecialFunction(func) {
    switch (func) {
        case "⌫":
        expression = expression.slice(0, -1);
        break;
        case "c":
        expression = "";
        break;
        case "🟰":
        try {
            const evaluatedExpression = eval(
            expression
                .replace(/÷/g,  "/")
                .replace(/✖️/g, "*")
                .replace(/➕/g, "+")
                .replace(/➖/g, "-")
            );
            expression = evaluatedExpression.toString();
        } catch {
            expression = "Error";
        }
        break;
        case "➗":
            expression += "/";
        break;
        case "✖️":
            expression += "*";
        break;
        case "➖":
            expression += "-";
        break;
        case "➕":
            expression += "+";
        break;
        default:
            expression += func;
        break;
    }
    updateDisplay();
    }

function handleKeyPress(event) {
    const key = event.key;
    if (/[0-9]/.test(key)) {
        handleInput(key);
    } else if (key === ".") {
        handleInput(key);
    } else if (key === "Enter") {
        handleSpecialFunction("🟰");
    } else if (key === "Backspace") {
        handleSpecialFunction("⌫");
    } else if (key === "Escape" || key === "Delete") {
        handleSpecialFunction("c");
    } else if (key === "+") {
        handleSpecialFunction("➕");
    } else if (key === "-") {
        handleSpecialFunction("➖");
    } else if (key === "*") {
        handleSpecialFunction("✖️");
    } else if (key === "/") {
        handleSpecialFunction("➗");
    } else if (key === "(") {
        handleInput("(");
    } else if (key === ")") {
        handleInput(")");
    }
}

function updateDisplay() {
    expressionElement.textContent = expression;
    try {
        resultElement.textContent = eval(
        expression
            .replace(/÷/g, "/")
            .replace(/✖️/g, "*")
            .replace(/➕/g, "+")
            .replace(/➖/g, "-")
        );
    } catch {
        resultElement.textContent = "";
    }
}
    });
