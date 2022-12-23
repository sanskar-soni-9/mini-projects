"use strict";

const functionKeys = document.querySelector(".functions");
const keys = document.querySelectorAll(".key");
const displayField = document.querySelector("#display-field");

let expression = "";

const createExpression = function (key) {
  if (key === "DEL") {
    expression = expression.slice(0, expression.length - 1);
    displayField.value = expression;
    return;
  }
  if (key === "AC") {
    expression = "";
    displayField.value = expression;
    return;
  }
  if (
    expression.length > 1 &&
    (key === "/" || key === "*") &&
    (expression.charAt(expression.length - 1) === "/" ||
      expression.charAt(expression.length - 1) === "*")
  )
    key = `1${key}`;
  if (key === "=") {
    if (!expression) return;
    const answer = eval(expression);
    displayField.value = answer; //calculate using eval()
    expression = answer;
    return;
  }
  expression += key;
  if (
    expression === "+" ||
    expression === "*" ||
    expression === "-" ||
    expression === "." ||
    expression === "/"
  )
    expression = "0" + expression;
  displayField.value = expression;
};

//Conditions
const checkNumber = function (key) {
  if (
    key === "1" ||
    key === "2" ||
    key === "3" ||
    key === "4" ||
    key === "5" ||
    key === "6" ||
    key === "7" ||
    key === "8" ||
    key === "9" ||
    key === "0"
  )
    return key;
  return false;
};
const checkOperator = function (key) {
  if (key === "+" || key === "*" || key === "-" || key === ".") return key;
  return false;
};

//Event Handlers
window.addEventListener("keydown", function (e) {
  if (checkOperator(e.key) || e.key === "/") createExpression(e.key);
  else if (e.key === "Backspace") createExpression("DEL");
  else if (e.key === "Enter") createExpression("=");
  else if (checkNumber(e.key)) createExpression(Number(e.key));
});

functionKeys.addEventListener("click", function (e) {
  for (const key of keys) {
    if (e.target === key) {
      if (
        checkOperator(key.textContent) ||
        key.textContent === "DEL" ||
        key.textContent === "AC" ||
        key.textContent === "="
      )
        createExpression(key.textContent);
      else if (key.textContent === "÷") createExpression("/");
      else if (checkNumber(key.textContent))
        createExpression(Number(key.textContent));
    }
  }
});
