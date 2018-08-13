/// <reference path="../typings/jquery/jquery.d.ts" />

enum FsmState { Number1, Number2display1, Number2, Equals }

class Calculator {
    state: FsmState;
    value: number;
    oldValue: number;
    newValue: number;
    binaryOperator: string;
    calcElement: HTMLTableElement;
    display: HTMLTableCellElement;
    buttons: NodeListOf<HTMLElement>;

    constructor(calcElement: HTMLTableElement) {
        this.calcElement = calcElement;
        this.display = <HTMLTableCellElement>document.getElementsByClassName('display')[0];
        this.buttons = <NodeListOf<HTMLElement>>calcElement.getElementsByTagName('button');
        this.state = FsmState.Number1;
        this.value = this.newValue = this.oldValue = 0;
        this.WireEvents();
    }

    WireEvents() {
        $('.digit').click(this.Digit);
        $('.correctError').click(this.CorrectError);
        $('.clear').click(this.Clear);
        $('.negate').click(this.Negate);
        $('.sqrt').click(this.Sqrt);
        $('.invert').click(this.Invert);
        $('.binaryOp').click(this.BinaryOp);
        $('.equals').click(this.Equals);
        $('.percent').click(this.Percent);
    }

    SetValue(value: number) {
        this.value = value;
        this.display.textContent = this.value.toString();
    }

    ParseAndFormat(digit: string) {
        if (digit == '\u2190') { // left arrow
            if (this.display.textContent.length > 1) {
                this.display.textContent = this.display.textContent.substr(0, this.display.textContent.length - 1);
            } else {
                this.display.textContent = '0';
            }
        } else {
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
    }

    Digit(event: MouseEvent) {
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
    }

    Negate(event: MouseEvent) {
        calculator.SetValue(-calculator.value);
    }

    Sqrt(event: MouseEvent) {
        calculator.SetValue(Math.sqrt(calculator.value));
    }

    Invert(event: MouseEvent) {
        calculator.SetValue(1 / calculator.value);
    }

    BinaryOp(event: MouseEvent) {
        var target = GetSourceElement(event);
        calculator.binaryOperator = target.textContent;
        calculator.oldValue = calculator.value;
        calculator.value = 0;
        calculator.state = FsmState.Number2display1;
    }

    Percent(event: MouseEvent) {
        calculator.SetValue(calculator.oldValue * calculator.value / 100);
    }

    Equals(event: MouseEvent) {
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
    }

    CorrectError(event: MouseEvent) {
        calculator.SetValue(0);
    }

    Clear(event: MouseEvent) {
        calculator.oldValue = calculator.newValue = 0;
        calculator.CorrectError(event);
        calculator.state = FsmState.Number1;
    }
}

// Firefox
function GetSourceElement(event) {
    if (document.all) {
        return event.srcElement;
    }
    else {
        return event.target;
    }
}

var calculator: Calculator;

$(document).ready(function () {
    var el = $('.calculator')[0];
    calculator = new Calculator(<HTMLTableElement>el);
});
