const numberBtns = document.querySelectorAll("[data-number]");
const operationBtns = document.querySelectorAll("[data-operation]");
const equalsBtn = document.querySelector("[data-equals]");
const clearAllBtn = document.querySelector("[data-clear-all]");
const deleteBtn = document.querySelector("[data-delete]");
const previousOperandElement = document.querySelector(
  "[data-previous-operand]"
);
const currentOperandElement = document.querySelector("[data-current-operand]");

let previousOperand = "";
let currentOperand = "0";
let operation;

const clear = () => {
  previousOperand = "";
  currentOperand = "0";
  operation = null;
};

const deleteNumber = () => {
  currentOperand =
    currentOperand.toString().length === 1
      ? (currentOperand = 0)
      : currentOperand.toString().slice(0, -1);
};

const addNumber = (number) => {
  if (number === "." && currentOperand.includes(".")) return;
  if (currentOperand.toString() === "0") currentOperand = number.toString();
  else currentOperand = currentOperand.toString() + number.toString();
};

const chooseOperation = (insertOperation) => {
  if (currentOperand === "") return;
  if (previousOperand !== "") calculate();
  operation = insertOperation;
  previousOperand = currentOperand;
  currentOperand = "";
};

const calculate = () => {
  let calculation;
  const prev = parseFloat(previousOperand);
  const cur = parseFloat(currentOperand);
  console.log(prev, cur);
  if (isNaN(prev) || isNaN(cur)) return;
  switch (operation) {
    case "+":
      calculation = prev + cur;
      break;
    case "-":
      calculation = prev - cur;
      break;
    case "÷ ":
      calculation = prev / cur || 0;
      if (
        calculation.toString() === "Infinity" ||
        calculation.toString() === "-Infinity"
      ) {
        calculation = 0;
      }
      break;
    case "\t× ":
      calculation = prev * cur;
      break;
    default:
      return;
  }

  currentOperand = calculation;
  operation = null;
  previousOperand = "";
};

const updateDisplay = () => {
  currentOperandElement.innerText = currentOperand;
  if (operation) {
    previousOperandElement.innerText = `${previousOperand} ${operation}`;
  } else {
    previousOperandElement.innerText = "";
  }
};
numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    addNumber(btn.textContent);
    updateDisplay();
  });
});

operationBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    chooseOperation(btn.textContent);
    updateDisplay();
  });
});

equalsBtn.addEventListener("click", () => {
  calculate();
  updateDisplay();
});

clearAllBtn.addEventListener("click", () => {
  clear();
  updateDisplay();
});

deleteBtn.addEventListener("click", () => {
  deleteNumber();
  updateDisplay();
});
