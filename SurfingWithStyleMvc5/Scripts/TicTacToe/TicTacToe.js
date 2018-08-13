/// <reference path="../typings/typescript/typescript.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="istate.ts" />
/// <reference path="igame.ts" />
/// <reference path="state.ts" />
var TicTacToe;
(function (TicTacToe_1) {
    var size = 100;
    var t;
    var TicTacToe = /** @class */ (function () {
        function TicTacToe() {
            this.Clear();
        }
        // IGame
        TicTacToe.prototype.Player = function (state) {
            return state.Player;
        };
        TicTacToe.prototype.Actions = function (state) {
            var actions = [];
            for (var i = 0; i < state.Board.length; i++) {
                if (state.Board[i] == TicTacToe_1.Marks.Empty) {
                    actions.push(i);
                }
            }
            return actions;
        };
        TicTacToe.prototype.Result = function (state, action) {
            var newState = new TicTacToe_1.State();
            newState.Board = this.CopyArray(state.Board);
            newState.Player = -state.Player;
            var index = this.Actions(newState).indexOf(action);
            if (index == -1) {
                return newState;
            }
            newState.Board[action] = newState.Player;
            return newState;
        };
        TicTacToe.prototype.TerminalTest = function (state) {
            var score = TicTacToe_1.Scores.Unfinished;
            // What the heck - test exhaustively
            if (state.Board[0] != TicTacToe_1.Marks.Empty && state.Board[0] == state.Board[1] && state.Board[1] == state.Board[2]) {
                score = state.Board[0];
            }
            if (state.Board[3] != TicTacToe_1.Marks.Empty && state.Board[3] == state.Board[4] && state.Board[4] == state.Board[5]) {
                score = state.Board[3];
            }
            if (state.Board[6] != TicTacToe_1.Marks.Empty && state.Board[6] == state.Board[7] && state.Board[7] == state.Board[8]) {
                score = state.Board[6];
            }
            if (state.Board[0] != TicTacToe_1.Marks.Empty && state.Board[0] == state.Board[3] && state.Board[3] == state.Board[6]) {
                score = state.Board[0];
            }
            if (state.Board[1] != TicTacToe_1.Marks.Empty && state.Board[1] == state.Board[4] && state.Board[4] == state.Board[7]) {
                score = state.Board[1];
            }
            if (state.Board[2] != TicTacToe_1.Marks.Empty && state.Board[2] == state.Board[5] && state.Board[5] == state.Board[8]) {
                score = state.Board[2];
            }
            if (state.Board[0] != TicTacToe_1.Marks.Empty && state.Board[0] == state.Board[4] && state.Board[4] == state.Board[8]) {
                score = state.Board[0];
            }
            if (state.Board[2] != TicTacToe_1.Marks.Empty && state.Board[2] == state.Board[4] && state.Board[4] == state.Board[6]) {
                score = state.Board[2];
            }
            if (score == TicTacToe_1.Scores.Unfinished && this.Actions(state).length == 0) {
                score = TicTacToe_1.Scores.Draw;
            }
            return score;
        };
        TicTacToe.prototype.Utility = function (state, player) {
            return this.TerminalTest(state);
        };
        TicTacToe.prototype.CopyArray = function (stringOrNumberArray) {
            return JSON.parse(JSON.stringify(stringOrNumberArray));
        };
        TicTacToe.prototype.MakeSquare = function () {
            $("svg").height($("svg").width());
        };
        TicTacToe.prototype.UpdateSvg = function () {
            $(".svg-parent").html($(".svg-parent").html());
        };
        TicTacToe.prototype.Clear = function () {
            this.State = new TicTacToe_1.State();
            $(".stroke").each(function () {
                $(this).remove();
            });
            this.UpdateSvg();
        };
        TicTacToe.prototype.DetermineWinner = function () {
            var score = this.TerminalTest(this.State);
            switch (score) {
                case TicTacToe_1.Scores.X:
                    $(".gameover-body").html("X wins.");
                    this.DrawLine();
                    this.UpdateSvg();
                    ShowModal(".gameover");
                    break;
                case TicTacToe_1.Scores.O:
                    $(".gameover-body").html("O wins...</br><h1>AND YOU LOSE!!!</h1>");
                    this.DrawLine();
                    this.UpdateSvg();
                    ShowModal(".gameover");
                    break;
                case TicTacToe_1.Scores.Draw:
                    $(".gameover-body").html("Draw.");
                    ShowModal(".gameover");
                    break;
                case TicTacToe_1.Scores.Unfinished:
                    break;
            }
        };
        TicTacToe.prototype.Move = function (player, action) {
            if (this.State.Score != TicTacToe_1.Scores.Unfinished) {
                return;
            }
            var index = this.Actions(this.State).indexOf(action);
            if (index == -1) {
                return;
            }
            var row = Math.floor(action / 3);
            var column = action % 3;
            if (player == TicTacToe_1.Players.X) {
                this.State.Board[action] = TicTacToe_1.Marks.X;
                $("svg").append('<line class="stroke" ' +
                    'x1="' + (size * column + 10) + '" ' +
                    'y1="' + (size * row + 10) + '" ' +
                    'x2="' + (size * column + 90) + '" ' +
                    'y2="' + (size * row + 90) + '" ' +
                    'style="stroke: #ffffff; stroke-width:3" />');
                $("svg").append('<line class="stroke" ' +
                    'x1="' + (size * column + 10) + '" ' +
                    'y1="' + (size * row + 90) + '" ' +
                    'x2="' + (size * column + 90) + '" ' +
                    'y2="' + (size * row + 10) + '" ' +
                    'style="stroke: #ffffff; stroke-width:3" />');
            }
            else {
                this.State.Board[action] = TicTacToe_1.Marks.O;
                $("svg").append('<circle class="stroke" ' +
                    'cx="' + (size * column + 50) + '" ' +
                    'cy="' + (size * row + 50) + '" ' +
                    'r="' + (size / 2 - 10) + '" ' +
                    'style="stroke: #ffffff; stroke-width:3" />');
            }
            this.UpdateSvg();
            this.DetermineWinner();
        };
        TicTacToe.prototype.DrawLine = function () {
            // What the heck - test exhaustively
            if (this.State.Board[0] != TicTacToe_1.Marks.Empty && this.State.Board[0] == this.State.Board[1] && this.State.Board[1] == this.State.Board[2]) {
                this.line = [30, 50, 270, 50];
            }
            if (this.State.Board[3] != TicTacToe_1.Marks.Empty && this.State.Board[3] == this.State.Board[4] && this.State.Board[4] == this.State.Board[5]) {
                this.line = [30, 150, 270, 150];
            }
            if (this.State.Board[6] != TicTacToe_1.Marks.Empty && this.State.Board[6] == this.State.Board[7] && this.State.Board[7] == this.State.Board[8]) {
                this.line = [30, 250, 270, 250];
            }
            if (this.State.Board[0] != TicTacToe_1.Marks.Empty && this.State.Board[0] == this.State.Board[3] && this.State.Board[3] == this.State.Board[6]) {
                this.line = [50, 30, 50, 270];
            }
            if (this.State.Board[1] != TicTacToe_1.Marks.Empty && this.State.Board[1] == this.State.Board[4] && this.State.Board[4] == this.State.Board[7]) {
                this.line = [150, 30, 150, 270];
            }
            if (this.State.Board[2] != TicTacToe_1.Marks.Empty && this.State.Board[2] == this.State.Board[5] && this.State.Board[5] == this.State.Board[8]) {
                this.line = [250, 30, 250, 270];
            }
            if (this.State.Board[0] != TicTacToe_1.Marks.Empty && this.State.Board[0] == this.State.Board[4] && this.State.Board[4] == this.State.Board[8]) {
                this.line = [30, 30, 270, 270];
            }
            if (this.State.Board[2] != TicTacToe_1.Marks.Empty && this.State.Board[2] == this.State.Board[4] && this.State.Board[4] == this.State.Board[6]) {
                this.line = [30, 270, 270, 30];
            }
            if (this.line.length == 4) {
                $("svg").append('<line class="stroke" ' +
                    'x1="' + this.line[0] + '" ' +
                    'y1="' + this.line[1] + '" ' +
                    'x2="' + this.line[2] + '" ' +
                    'y2="' + this.line[3] + '" ' +
                    'style="stroke: #cccccc; stroke-width:9" />');
            }
        };
        TicTacToe.prototype.MnMx = function (state) {
            if (this.TerminalTest(state) != TicTacToe_1.Scores.Unfinished) {
                return this.Utility(state, state.Player);
            }
            var v = -1000;
            var actions = this.Actions(state);
            var actionValues = [];
            for (var i = 0; i < actions.length; i++) {
                var a = actions[i];
                var newState = this.Result(state, a);
                actionValues.push(Math.max(v, this.Min(newState, -1000, 1000)));
            }
            var maxActionValue = -1000;
            for (var i = 0; i < actions.length; i++) {
                if (actionValues[i] > maxActionValue) {
                    maxActionValue = actionValues[i];
                }
            }
            var candidateActions = [];
            for (var i = 0; i < actions.length; i++) {
                if (actionValues[i] >= maxActionValue - Math.abs(0.5 * maxActionValue)) {
                    candidateActions.push(actions[i]);
                }
            }
            var index = Math.floor(Math.random() * candidateActions.length);
            var action = candidateActions[index];
            return action;
        };
        TicTacToe.prototype.Max = function (state, alpha, beta) {
            if (this.TerminalTest(state) != TicTacToe_1.Scores.Unfinished) {
                return this.Utility(state, state.Player);
            }
            var v = -1000;
            var actions = this.Actions(state);
            for (var i = 0; i < actions.length; i++) {
                var a = actions[i];
                var newState = this.Result(state, a);
                v = Math.max(v, this.Min(newState, alpha, beta));
                if (v >= beta) {
                    return v;
                }
                alpha = Math.max(alpha, v);
            }
            return v;
        };
        TicTacToe.prototype.Min = function (state, alpha, beta) {
            if (this.TerminalTest(state) != TicTacToe_1.Scores.Unfinished) {
                return this.Utility(state, state.Player);
            }
            var v = 1000;
            var actions = this.Actions(state);
            for (var i = 0; i < actions.length; i++) {
                var a = actions[i];
                var newState = this.Result(state, a);
                v = Math.min(v, this.Max(newState, alpha, beta));
                if (v <= alpha) {
                    return v;
                }
                beta = Math.min(beta, v);
            }
            return v;
        };
        TicTacToe.prototype.OsTurn = function () {
            var actions = this.Actions(this.State);
            if (actions.length > 5) {
                $(document).css('cursor', 'wait');
                //ShowModal(".thinking");
            }
            setTimeout(function () {
                var move = t.MnMx(t.State);
                //HideModal(".thinking");
                $(document).css('cursor', 'auto');
                t.Move(TicTacToe_1.Players.O, move);
            }, 100);
        };
        return TicTacToe;
    }());
    $(document).ready(function () {
        t = new TicTacToe();
        t.MakeSquare();
    });
    $(window).resize(function () {
        t.MakeSquare();
    });
    $(".svg-parent").click(function (e) {
        var x, y;
        if (e.offsetX != undefined && e.offsetY != undefined) {
            x = e.offsetX;
            y = e.offsetY;
        }
        else { // Firefox
            x = e.clientX - $(".svg-parent").offset().left;
            y = e.clientY - $(".svg-parent").offset().top;
        }
        var row = Math.floor(3 * y / $("svg").height());
        var column = Math.floor(3 * x / $("svg").width());
        t.Move(TicTacToe_1.Players.X, 3 * row + column);
        t.OsTurn();
    });
    $(".reset").click(function (e) {
        t.Clear();
    });
})(TicTacToe || (TicTacToe = {}));
//# sourceMappingURL=TicTacToe.js.map