/// <reference path="../typings/typescript/typescript.d.ts" />
/// <reference path="../typings/jquery/jquery.d.ts" />
/// <reference path="../typings/snapsvg/snapsvg.d.ts" />
/// <reference path="istate.ts" />
/// <reference path="igame.ts" />
/// <reference path="state.ts" />
var XMensMorris;
(function (XMensMorris_1) {
    var leftMargin = 100;
    var topMargin = 0;
    var rightMargin = 100;
    var bottomMargin = 0;
    var size = 100;
    var t;
    var XMensMorris = /** @class */ (function () {
        function XMensMorris() {
            this.Clear();
        }
        // IGame
        XMensMorris.prototype.Player = function (state) {
            return state.Player;
        };
        XMensMorris.prototype.Actions = function (state) {
            var actions = [];
            for (var i = 0; i < state.Board.length; i++) {
                if (state.Board[i] == XMensMorris_1.Marks.Empty) {
                    actions.push(i);
                }
            }
            return actions;
        };
        XMensMorris.prototype.Result = function (state, action) {
            var newState = new XMensMorris_1.State();
            newState.Board = this.CopyArray(state.Board);
            newState.Player = -state.Player;
            var index = this.Actions(newState).indexOf(action);
            if (index == -1) {
                return newState;
            }
            newState.Board[action] = newState.Player;
            return newState;
        };
        XMensMorris.prototype.TerminalTest = function (state) {
            var score = XMensMorris_1.Scores.Unfinished;
            // What the heck - test exhaustively
            if (state.Board[0] != XMensMorris_1.Marks.Empty && state.Board[0] == state.Board[1] && state.Board[1] == state.Board[2]) {
                score = state.Board[0];
            }
            if (state.Board[3] != XMensMorris_1.Marks.Empty && state.Board[3] == state.Board[4] && state.Board[4] == state.Board[5]) {
                score = state.Board[3];
            }
            if (state.Board[6] != XMensMorris_1.Marks.Empty && state.Board[6] == state.Board[7] && state.Board[7] == state.Board[8]) {
                score = state.Board[6];
            }
            if (state.Board[0] != XMensMorris_1.Marks.Empty && state.Board[0] == state.Board[3] && state.Board[3] == state.Board[6]) {
                score = state.Board[0];
            }
            if (state.Board[1] != XMensMorris_1.Marks.Empty && state.Board[1] == state.Board[4] && state.Board[4] == state.Board[7]) {
                score = state.Board[1];
            }
            if (state.Board[2] != XMensMorris_1.Marks.Empty && state.Board[2] == state.Board[5] && state.Board[5] == state.Board[8]) {
                score = state.Board[2];
            }
            if (state.Board[0] != XMensMorris_1.Marks.Empty && state.Board[0] == state.Board[4] && state.Board[4] == state.Board[8]) {
                score = state.Board[0];
            }
            if (state.Board[2] != XMensMorris_1.Marks.Empty && state.Board[2] == state.Board[4] && state.Board[4] == state.Board[6]) {
                score = state.Board[2];
            }
            if (score == XMensMorris_1.Scores.Unfinished && this.Actions(state).length == 0) {
                score = XMensMorris_1.Scores.Draw;
            }
            return score;
        };
        XMensMorris.prototype.Utility = function (state, player) {
            return this.TerminalTest(state);
        };
        XMensMorris.prototype.CopyArray = function (stringOrNumberArray) {
            return JSON.parse(JSON.stringify(stringOrNumberArray));
        };
        XMensMorris.prototype.Clear = function () {
            this.State = new XMensMorris_1.State();
            while (this.white != undefined && this.white.length > 0) {
                var x = this.white.pop();
                x.remove();
            }
            while (this.black != undefined && this.black.length > 0) {
                var x = this.black.pop();
                x.remove();
            }
            this.svg = Snap("svg");
            this.black = new Array();
            this.black.push(this.svg.circle(4 * size + size / 2, size / 2, size / 3 - 10).attr({
                fill: "black",
                style: "stroke: #ffffff; stroke-width:3"
            }));
            this.black.push(this.svg.circle(4 * size + size / 2, size + size / 2, size / 3 - 10).attr({
                fill: "black",
                style: "stroke: #ffffff; stroke-width:3"
            }));
            this.black.push(this.svg.circle(4 * size + size / 2, 2 * size + size / 2, size / 3 - 10).attr({
                fill: "black",
                style: "stroke: #ffffff; stroke-width:3"
            }));
            this.white = new Array();
            this.white.push(this.svg.circle(size / 2, size / 2, size / 3 - 10).attr({
                fill: "white",
                style: "stroke: #ffffff; stroke-width:3"
            }));
            this.white.push(this.svg.circle(size / 2, size + size / 2, size / 3 - 10).attr({
                fill: "white",
                style: "stroke: #ffffff; stroke-width:3"
            }));
            this.white.push(this.svg.circle(size / 2, 2 * size + size / 2, size / 3 - 10).attr({
                fill: "white",
                style: "stroke: #ffffff; stroke-width:3"
            }));
        };
        XMensMorris.prototype.DetermineWinner = function () {
            var score = this.TerminalTest(this.State);
            switch (score) {
                case XMensMorris_1.Scores.X:
                    $(".gameover-body").html("White wins.");
                    ShowModal(".gameover");
                    break;
                case XMensMorris_1.Scores.O:
                    $(".gameover-body").html("Black wins...</br><h1>AND YOU LOSE!!!</h1>");
                    ShowModal(".gameover");
                    break;
                case XMensMorris_1.Scores.Draw:
                    $(".gameover-body").html("Draw.");
                    ShowModal(".gameover");
                    break;
                case XMensMorris_1.Scores.Unfinished:
                    break;
            }
        };
        XMensMorris.prototype.Place = function (player, action) {
            if (this.State.Score != XMensMorris_1.Scores.Unfinished) {
                return;
            }
            var index = this.Actions(this.State).indexOf(action);
            if (index == -1) {
                return;
            }
            var row = Math.floor(action / 3);
            var column = action % 3;
            if (player == XMensMorris_1.Players.X) {
                if (this.State.Turn < 3) {
                    this.white[this.State.Turn].animate({
                        cx: (leftMargin + size / 2 + size * column),
                        cy: (topMargin + size / 2 + size * row)
                    }, 400);
                    this.State.Board[action] = -(this.State.Turn + 1);
                }
            }
            else {
                if (this.State.Turn < 3) {
                    this.black[this.State.Turn].animate({
                        cx: (leftMargin + size / 2 + size * column),
                        cy: (topMargin + size / 2 + size * row)
                    }, 400);
                    this.State.Board[action] = this.State.Turn + 1;
                }
                this.State.Turn++;
            }
            this.DetermineWinner();
        };
        XMensMorris.prototype.Select = function (player, square) {
            var stone = this.State.Board[square];
            if (stone / Math.abs(stone) == player) {
                this.State.Selected = square;
                if (player == XMensMorris_1.Players.X) {
                    stone = -stone;
                    this.white[stone - 1].attr({ fill: "gray" });
                }
            }
            else {
                this.State.Selected = -1;
                if (player == XMensMorris_1.Players.X) {
                    stone = -stone;
                    this.white[stone - 1].attr({ fill: "white" });
                }
            }
            this.MarkLegalMoves(player, square);
        };
        XMensMorris.prototype.MarkLegalMoves = function (player, square) {
            if (player == XMensMorris_1.Players.X) {
                if (this.markers != null) {
                    this.markers.forEach(function (marker) {
                        marker.remove();
                    });
                }
                var row = Math.floor(this.State.Selected / 3);
                var column = this.State.Selected % 3;
                this.markers = new Array();
                this.markers.push(this.svg.circle(leftMargin + size * column + size / 2, topMargin + size * column + size / 2, size / 3).attr({
                    fill: "black",
                    style: "stroke: #ffffff; stroke-width:1"
                }));
            }
        };
        XMensMorris.prototype.Move = function (player, action) {
            var actions = this.Actions(this.State);
            var stone = this.State.Board[this.State.Selected];
            if (actions.indexOf(action) >= 0) {
                this.State.Board[action] = stone;
                var row = Math.floor(action / 3);
                var column = action % 3;
                if (player == XMensMorris_1.Players.X) {
                    stone *= -1;
                    this.white[stone - 1].animate({
                        cx: (leftMargin + size / 2 + size * column),
                        cy: (topMargin + size / 2 + size * row),
                        fill: "white"
                    }, 400);
                }
                else {
                    this.black[stone - 1].animate({
                        cx: (leftMargin + size / 2 + size * column),
                        cy: (topMargin + size / 2 + size * row),
                        fill: "black"
                    }, 400);
                }
                this.State.Board[this.State.Selected] = XMensMorris_1.Marks.Empty;
            }
            else {
                if (player == XMensMorris_1.Players.X) {
                    stone = -stone;
                    this.white[stone - 1].attr({ fill: "white" });
                }
                else {
                    this.white[stone - 1].attr({ fill: "black" });
                }
            }
            this.State.Selected = -1;
        };
        XMensMorris.prototype.MnMx = function (state) {
            if (this.TerminalTest(state) != XMensMorris_1.Scores.Unfinished) {
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
        XMensMorris.prototype.Max = function (state, alpha, beta) {
            if (this.TerminalTest(state) != XMensMorris_1.Scores.Unfinished) {
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
        XMensMorris.prototype.Min = function (state, alpha, beta) {
            if (this.TerminalTest(state) != XMensMorris_1.Scores.Unfinished) {
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
        XMensMorris.prototype.OsTurn = function () {
            var actions = this.Actions(this.State);
            if (actions.length > 5) {
                $(document).css('cursor', 'wait');
                //ShowModal(".thinking");
            }
            setTimeout(function () {
                var move = t.MnMx(t.State);
                //HideModal(".thinking");
                $(document).css('cursor', 'auto');
                if (t.State.Turn < 3) {
                    t.Place(XMensMorris_1.Players.O, move);
                }
                else {
                }
            }, 100);
        };
        return XMensMorris;
    }());
    $(document).ready(function () {
        t = new XMensMorris();
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
        var row = Math.floor(3 * (y - topMargin) / ($("svg").height() - topMargin - bottomMargin));
        row = Math.max(Math.min(2, row), 0);
        var column = Math.floor(3 * (x - leftMargin) / ($("svg").width() - leftMargin - rightMargin));
        column = Math.max(Math.min(2, column), 0);
        if (t.State.Turn < 3) {
            t.Place(XMensMorris_1.Players.X, 3 * row + column);
        }
        else if (t.State.Selected < 0) {
            t.Select(XMensMorris_1.Players.X, 3 * row + column);
        }
        else {
            t.Move(XMensMorris_1.Players.X, 3 * row + column);
        }
        t.OsTurn();
    });
    $(".reset").click(function (e) {
        t.Clear();
    });
})(XMensMorris || (XMensMorris = {}));
//# sourceMappingURL=XMensMorris.js.map