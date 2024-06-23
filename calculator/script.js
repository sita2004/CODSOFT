document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const buttons = Array.from(document.getElementsByClassName("btn"));

    let currentInput = "";
    let lastInput = ""; // To store the last input number
    let isPowerMode = false; // To track if x^x button was pressed

    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const value = this.textContent;

            if (this.id === "clear") {
                currentInput = "";
                lastInput = "";
                isPowerMode = false;
                display.textContent = "0";
            } else if (this.id === "delete") {
                currentInput = currentInput.slice(0, -1);
                display.textContent = currentInput || "0";
            } else if (this.id === "equals") {
                try {
                    currentInput = currentInput
                        .replace(/log\(/g, "Math.log10(")
                        .replace(/sin\(/g, "Math.sin((Math.PI/180)*")
                        .replace(/cos\(/g, "Math.cos((Math.PI/180)*")
                        .replace(/tan\(/g, "Math.tan((Math.PI/180)*")
                        .replace(/e\^/g, "Math.exp")
                        .replace(/(\d+)\^(\d+)/g, "Math.pow($1, $2)")
                        .replace(/π/g, "Math.PI")
                        .replace(/E/g, "Math.E");

                    display.textContent = eval(currentInput);
                    currentInput = display.textContent;
                } catch (e) {
                    display.textContent = "Error";
                }
            } else if (this.id === "xx") {
                // Store the current input and wait for the next input for the power
                lastInput = currentInput;
                isPowerMode = true;
                currentInput = "";
                display.textContent = "x^x";
            } else if (["log", "sin", "cos", "tan", "ex"].includes(this.id)) {
                currentInput += value + "(";
                display.textContent = currentInput;
            } else if (this.id === "left-parenthesis") {
                currentInput += "(";
                display.textContent = currentInput;
            } else if (this.id === "right-parenthesis") {
                currentInput += ")";
                display.textContent = currentInput;
            } else if (["add", "subtract", "multiply", "divide"].includes(this.id)) {
                currentInput += value;
                display.textContent = currentInput;
            } else {
                if (isPowerMode) {
                    // If in power mode, calculate the power and reset the mode
                    currentInput = `Math.pow(${lastInput}, ${value})`;
                    display.textContent = eval(currentInput);
                    currentInput = display.textContent;
                    isPowerMode = false;
                } else {
                    currentInput += value;
                    display.textContent = currentInput;
                }
            }
        });
    });
});
