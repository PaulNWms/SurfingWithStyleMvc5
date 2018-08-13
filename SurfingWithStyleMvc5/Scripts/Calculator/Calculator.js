/// <reference path="../typings/jquery/jquery.d.ts" />
var FsmState;
(function (FsmState) {
    FsmState[FsmState["Number1"] = 0] = "Number1";
    FsmState[FsmState["Number2display1"] = 1] = "Number2display1";
    FsmState[FsmState["Number2"] = 2] = "Number2";
    FsmState[FsmState["Equals"] = 3] = "Equals";
})(FsmState || (FsmState = {}));
var Calculator = /** @class */ (function () {
    function Calculator(calcElement) {
        this.calcElement = calcElement;
        this.display = document.getElementsByClassName('display')[0];
        this.buttons = calcElement.getElementsByTagName('button');
        this.state = FsmState.Number1;
        this.value = this.newValue = this.oldValue = 0;
        this.WireEvents();
    }
    Calculator.prototype.WireEvents = function () {
        $('.digit').click(this.Digit);
        $('.correctError').click(this.CorrectError);
        $('.clear').click(this.Clear);
        $('.negate').click(this.Negate);
        $('.sqrt').click(this.Sqrt);
        $('.invert').click(this.Invert);
        $('.binaryOp').click(this.BinaryOp);
        $('.equals').click(this.Equals);
        $('.percent').click(this.Percent);
    };
    Calculator.prototype.SetValue = function (value) {
        this.value = value;
        this.display.textContent = this.value.toString();
    };
    Calculator.prototype.ParseAndFormat = function (digit) {
        if (digit == '\u2190') { // left arrow
            if (this.display.textContent.length > 1) {
                this.display.textContent = this.display.textContent.substr(0, this.display.textContent.length - 1);
            }
            else {
                this.display.textContent = '0';
            }
        }
        else {
            this.display.textContent += digit;
        }
        this.value = parseFloat(this.display.textContent);
        this.display.textContent = this.value.toString();
        if (digit == '.') {
            var isInteger = this.value == parseInt(this.display.textContent);
            if (isInteger) {
                this.display.textContent += '.';
            }
        }
    };
    Calculator.prototype.Digit = function (event) {
        switch (calculator.state) {
            case FsmState.Number2display1:
            case FsmState.Equals:
                calculator.SetValue(0);
                calculator.state = FsmState.Number2;
                break;
            default:
                break;
        }
        var target = GetSourceElement(event);
        calculator.ParseAndFormat(target.textContent);
    };
    Calculator.prototype.Negate = function (event) {
        calculator.SetValue(-calculator.value);
    };
    Calculator.prototype.Sqrt = function (event) {
        calculator.SetValue(Math.sqrt(calculator.value));
    };
    Calculator.prototype.Invert = function (event) {
        calculator.SetValue(1 / calculator.value);
    };
    Calculator.prototype.BinaryOp = function (event) {
        var target = GetSourceElement(event);
        calculator.binaryOperator = target.textContent;
        calculator.oldValue = calculator.value;
        calculator.value = 0;
        calculator.state = FsmState.Number2display1;
    };
    Calculator.prototype.Percent = function (event) {
        calculator.SetValue(calculator.oldValue * calculator.value / 100);
    };
    Calculator.prototype.Equals = function (event) {
        if (calculator.state == FsmState.Number2) {
            calculator.newValue = calculator.value;
        }
        switch (calculator.binaryOperator) {
            case '+':
                calculator.SetValue(calculator.oldValue + calculator.newValue);
                break;
            case '-':
                calculator.SetValue(calculator.oldValue - calculator.newValue);
                break;
            case '*':
                calculator.SetValue(calculator.oldValue * calculator.newValue);
                break;
            case '/':
                calculator.SetValue(calculator.oldValue / calculator.newValue);
                break;
        }
        calculator.oldValue = calculator.value;
        calculator.state = FsmState.Equals;
    };
    Calculator.prototype.CorrectError = function (event) {
        calculator.SetValue(0);
    };
    Calculator.prototype.Clear = function (event) {
        calculator.oldValue = calculator.newValue = 0;
        calculator.CorrectError(event);
        calculator.state = FsmState.Number1;
    };
    return Calculator;
}());
// Firefox
function GetSourceElement(event) {
    if (document.all) {
        return event.srcElement;
    }
    else {
        return event.target;
    }
}
var calculator;
$(document).ready(function () {
    var el = $('.calculator')[0];
    calculator = new Calculator(el);
});
//# sourceMappingURL=Calculator.js.map