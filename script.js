const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");

const previousText = document.querySelector("[data-previous]");
const currentText = document.querySelector("[data-current]");

class Calculator {
  constructor(previousVal, currentVal) {
    this.previousVal = previousVal;
    this.currentVal = currentVal;
    this.operation = undefined;
    this.clear();
  }

  clear() {
    this.previousVal = "";
    this.currentVal = "";
    this.operation = undefined;
  }
  del() {
    if(this.currentVal=='' && this.previousVal!=''){  
      this.operation = undefined;
      this.currentVal = this.previousVal;
      this.previousVal = '';
    }
    else if(this.currentVal == "") return;
    else this.currentVal = this.currentVal.toString().slice(0, -1);

  }
  numberAppend(number) {
    if (this.currentVal.length == 1 && this.currentVal == 0 && number != ".")
      this.currentVal = number;
    else {
      if (number == "." && this.currentVal.toString().includes(".")) return;
      this.currentVal = this.currentVal.toString() + number.toString();
    }
  }

  chooseOperation(operation) {
    if (this.operation !== undefined && this.currentVal == "") {
      this.operation = operation;
    } else {
      if (this.operation != "") {
        this.compute();
      }
      this.previousVal = this.currentVal;
      this.currentVal = "";
      this.operation = operation;
    }

    this.updateDisplay();
  }

  compute() {
    if (this.currentVal == "") return;
    let prev = Number(this.previousVal);
    let curr = Number(this.currentVal);
    let computation;
    switch (this.operation) {
      case "+":
        computation = prev + curr;
        break;
      case "-":
        computation = prev - curr;
        break;
      case "*":
        computation = prev * curr;
        break;
      case "/":
        computation = prev / curr;
        break;
      default:
        return;
    }

    this.currentVal = computation;
    this.previousVal = "";
    this.operation = undefined;
  }

  formatNo(number) {
    const stringNumber = number.toString();
    const integerVal = parseFloat(stringNumber.split(".")[0]);
    const decimalVal = stringNumber.split(".")[1];
    let integerDisplay;

    if (isNaN(integerVal)) integerDisplay = "";
    else {
      integerDisplay = integerVal.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }
    if (decimalVal != null) {
      return `${integerDisplay}.${decimalVal}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {

    if (this.operation != undefined) {
      previousText.textContent = `${this.formatNo(this.previousVal)} ${
        this.operation
      }`;
    } else {
      previousText.textContent = `${this.formatNo(this.previousVal)}`;
    }

    currentText.textContent = this.formatNo(this.currentVal);
  }
}

const calculator = new Calculator(previousText, currentText);

numberButtons.forEach((elm) => {
  elm.addEventListener("click", () => {
    calculator.numberAppend(elm.textContent);
    calculator.updateDisplay();
  });
});

operationButtons.forEach((elm) => {
  elm.addEventListener("click", () => {
    calculator.chooseOperation(elm.textContent);

    calculator.updateDisplay();
  });
});

allClearButton.addEventListener("click", () => {
  calculator.clear();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.del();
  calculator.updateDisplay();
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

window.addEventListener('keydown', (dets)=>{
  if(dets.key=='Backspace'){
    calculator.del();
    calculator.updateDisplay();
  }
  if(dets.key=='Enter' || dets.key=='='){
    calculator.compute();
    calculator.updateDisplay();
  }
  if(dets.key =='Escape'){
    calculator.clear();
    calculator.updateDisplay();
  }

  operationButtons.forEach(elm=>{
    if(dets.key==elm.textContent){
      calculator.chooseOperation(dets.key);
      calculator.updateDisplay();
    }
  })
  numberButtons.forEach(elm=>{
    if(dets.key==elm.textContent){
      calculator.numberAppend(elm.textContent);
      calculator.updateDisplay();
    }
  })

})
